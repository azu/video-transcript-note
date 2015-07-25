// LICENSE : MIT
"use strict";
import VideoShortcutController from "../video-shortcut-controller";
import VideoPrefetcher from "../video-prefetcher";
import VideoTranscriptTracker from "../video-transcript-tracker.js";
import {captureVideo} from "../utils/video-capture";
import React from "react";
export default class VideoViewer extends React.Component {

    componentDidMount() {
        this.video = React.findDOMNode(this.refs.video);
        var container = React.findDOMNode(this);
        var controller = new VideoShortcutController(container, this.video);
        controller.start();

        this.props.quoteCommunicator.onQuoteImageRequest((done) => {
            var dataURL = this.getCapturedImage();
            var currentTime = this.getCurrentTime();
            done(dataURL, currentTime);
        });
        setTimeout(()=> {
            this.onStart();
        }, 1000)
    }

    componentDidUpdate(prevProps, nextProps) {
        if (this.prefetcher) {
            this.onStop();
        }
        this.onStart();
    }

    onStop() {
        this.prefetcher.stop();
        this.tracker.stop();
    }

    getCurrentTime() {
        return this.video.currentTime;
    }

    getCapturedImage() {
        return captureVideo(this.video);
    }

    onStart() {
        if(this.props.videoURL == null) {
            return;
        }
        var videoAction = this.props.context.videoAction;
        this.prefetcher = new VideoPrefetcher(this.video);
        this.prefetcher.onProgress(function (event) {
            var percentComplete = event.loaded / event.total;
            console.log((percentComplete * 100) + "%");
        });
        this.prefetcher.onLoad(function (event) {
            console.log("loaded", event);
        });
        this.prefetcher.on("error", function (error) {
            console.error(error, error.stack);
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
        if (nextProps.videoURL == null) {
            return false;
        }
        return this.props.videoURL !== nextProps.videoURL;
    }

    render() {
        // http://stackoverflow.com/questions/3149362/capture-key-press-or-keydown-event-on-div-element
        return <div className="VideoViewer" tabIndex="0">
            <video id="player" src={this.props.videoURL} preload="auto" controls ref="video">
                <track kind="subtitles" src={this.props.trackURL}
                       srclang="en"
                       label="English"
                       default/>
            </video>
        </div>
    }
}