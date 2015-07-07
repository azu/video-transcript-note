// LICENSE : MIT
"use strict";
import VideoController from "../video-controller";
import VideoPrefetcher from "../video-prefetcher";
import VideoTranscriptTracker from "../video-transcript-tracker.js";
import {captureVideo} from "../utils/video-capture";
var React = require("react");
export default class VideoViewer extends React.Component {

    componentDidMount() {
        this.video = React.findDOMNode(this.refs.video);
        var container = React.findDOMNode(this);
        var controller = new VideoController(container, this.video);
        controller.start();
        setTimeout(()=> {
            this.onStart();
        }, 1000)
    }

    componentDidUpdate(prevProps, nextProps) {
        if (this.prefetcher) {
            this.onStop();
        }
        this.onStart()
    }

    onStop() {
        this.prefetcher.stop();
        this.tracker.stop();
    }

    capture(){
        return captureVideo(this.video);
    }

    onStart() {
        var videoAction = this.props.context.videoAction;
        this.prefetcher = new VideoPrefetcher(this.video);
        this.prefetcher.onProgress(function (error, event) {
            var percentComplete = event.loaded / event.total;
            console.log((percentComplete * 100) + "%");
        });
        this.prefetcher.onLoad(function (error, event) {
            console.log("loaded", event);
        });
        this.prefetcher.start();

        this.tracker = new VideoTranscriptTracker(this.video);
        Array.from(this.video.textTracks, track => {
            // hidden but could trace
            track.mode = "hidden";
        });
        this.tracker.onEnable(() => {
            console.log("enable:default");
        });
        this.tracker.onDisable(() => {
            console.log("disable");
            videoAction.updateTranscript("");
        });
        this.tracker.onChange((text)=> {
            videoAction.updateTranscript(text);
        });
        this.tracker.start();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.videoURL !== nextProps.videoURL;
    }

    render() {
        // http://stackoverflow.com/questions/3149362/capture-key-press-or-keydown-event-on-div-element
        return <div className="VideoViewer" tabIndex="0">
            <video id="player" preload="auto" controls ref="video">
                <source src={this.props.videoURL}/>
                <track kind="subtitles" src={this.props.trackURL}
                       srclang="en"
                       label="English"
                       default/>
            </video>
        </div>
    }
}