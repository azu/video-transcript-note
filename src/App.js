// LICENSE : MIT
"use strict";
import React from "react"
import MarkdownToolbar from "./components/MarkdownToolbar";
import MarkdownEditor from "./components/MarkdownEditor";
import MarkdownPreview from "./components/MarkdownPreview";
import VideoTranscript from "./components/VideoTranscript"
import VideoViewer from "./components/VideoViewer"
import VideoInputField from "./components/VideoInputField"
import QuoteCommunicator from "./communicator/QuoteCommunicator"
import {formatVideoTime} from "./utils/time-formatter"
import AppContextLocator from "./AppContextLocator";
import SaveImageDataUseCase from "./js/UseCase/editor/SaveImageDataUseCase";
import LoadVideoFromFileURL from "./js/UseCase/video/LoadVideoFromFileURL";
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.quoteCommunicator = new QuoteCommunicator();
    }

    quote() {
        /**
         * @type {VideoState} FIXME: name
         */
        const videoState = this.props.VideoStore;
        const transcript = videoState.currentTranscript;
        this.quoteCommunicator.quoteImage((dataURL, currentTime)=> {
            const videoName = videoState.videoName;
            AppContextLocator.context.useCase(SaveImageDataUseCase.create()).execute({
                fileName: `${videoName}-${formatVideoTime(currentTime)}.png`,
                currentTime: currentTime,
                dataURL: dataURL,
                transcript: transcript
            });
        });
    }

    render() {
        /**
         * @type {EditorState} FIXME: name
         */
        const editorState = this.props.EditorStore;
        /**
         * @type {VideoState} FIXME: name
         */
        const videoState = this.props.VideoStore;
        const onInputVideoURL = function (videoURL) {
            AppContextLocator.context.useCase(LoadVideoFromFileURL.create()).execute(videoURL);
        };

        // toggle by MarkdownToolbar
        var MarkdownComponent;
        if (editorState.readonly) {
            MarkdownComponent = <MarkdownPreview source={editorState.text}
                                                 readonly={editorState.readonly}/>;
        } else {
            MarkdownComponent = <MarkdownEditor editorState={editorState}
                                                quote={this.quote.bind(this)}/>
        }
        return (
            <div className="App">
                <div className="VideoViewer-container">
                    <VideoInputField handleSubmit={onInputVideoURL}/>
                    <VideoViewer videoURL={videoState.videoURL}
                                 trackURL={videoState.trackURL}
                                 quoteCommunicator={this.quoteCommunicator}/>
                    <VideoTranscript videoState={videoState}/>
                </div>
                <div className="MarkdownEditor-container">
                    <MarkdownToolbar editorState={editorState}
                                     quote={this.quote.bind(this)}

                    />
                    {MarkdownComponent}
                </div>
            </div>
        )
    }
}