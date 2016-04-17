// LICENSE : MIT
"use strict";
import React from "react"
import MarkdownToolbar from "./components/MarkdownToolbar";
import MarkdownEditor from "./components/MarkdownEditor";
import MarkdownPreview from "./components/MarkdownPreview";
import VideoTranscript from "./components/VideoTranscript"
import VideoViewer from "./components/VideoViewer"
import VideoInputField from "./components/VideoInputField"
import MainContext from "./MainContext"
import QuoteCommunicator from "./communicator/QuoteCommunicator"
import {formatVideoTime} from "./utils/time-formatter"
var context = new MainContext();
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.editorStore = context.editorStore;
        this.videoStore = context.videoStore;
        this.quoteCommunicator = new QuoteCommunicator();
    }

    componentDidMount() {
        this.videoStore.onChange(this._videoOnChange.bind(this));
    }

    _videoOnChange() {
        this.setState({
            currentTranscript: this.videoStore.getCurrentTranscript()
        });
    }

    componentWillUnmount() {
        this.videoStore.removeAllChangeListeners();
        this.editorStore.removeAllChangeListeners();
    }


    quote() {
        var transcript = context.videoStore.getCurrentTranscript();
        this.quoteCommunicator.quoteImage((dataURL, currentTime)=> {
            var videoName = context.videoStore.getVideoName();
            context.editorAction.saveImage({
                fileName: `${videoName}-${formatVideoTime(currentTime)}.png`,
                currentTime: currentTime,
                dataURL: dataURL,
                transcript: transcript
            });
        });
    }

    render() {
        /**
         * @type {EditorState}
         */
        const editorState = this.props.EditorStore;
        this.editorStore = context.editorStore;
        this.videoStore = context.videoStore;
        this.quoteCommunicator = new QuoteCommunicator();
        var onInputVideoURL = function (videoURL) {
            context.videoAction.loadVideoURL(videoURL);
        };

        // toggle by MarkdownToolbar
        var MarkdownComponent;
        if (editorState.readonly) {
            MarkdownComponent = <MarkdownPreview context={context} source={editorState.text}
                                                 readonly={editorState.readonly}/>;
        } else {
            MarkdownComponent = <MarkdownEditor context={context} editorState={editorState}
                                                quote={this.quote.bind(this)}/>
        }
        return (
            <div className="App">
                <div className="VideoViewer-container">
                    <VideoInputField handleSubmit={onInputVideoURL}/>
                    <VideoViewer context={context}
                                 videoURL={this.videoStore.getVideoURL()}
                                 trackURL={this.videoStore.getTrackURL()}
                                 quoteCommunicator={this.quoteCommunicator}/>
                    <VideoTranscript transcript={editorState.currentTranscript}/>
                </div>
                <div className="MarkdownEditor-container">
                    <MarkdownToolbar context={context}
                                     quote={this.quote.bind(this)}

                    />
                    {MarkdownComponent}
                </div>
            </div>
        )
    }
}