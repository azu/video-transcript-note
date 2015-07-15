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

var context = new MainContext();
class App extends React.Component {
    constructor(props) {
        super(props);
        this.editorStore = context.editorStore;
        this.videoStore = context.videoStore;
        this.quoteCommunicator = new QuoteCommunicator();
        this.state = {
            readonly: this.editorStore.isReadonly(),
            currentTranscript: this.videoStore.getCurrentTranscript()
        };
    }

    componentDidMount() {
        this.editorStore.onChange(this._editorChange.bind(this));
        this.videoStore.onChange(this._videoOnChange.bind(this));
    }

    _editorChange() {
        this.setState({
            readonly: this.editorStore.isReadonly()
        });
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

    render() {
        var onInputVideoURL = function (videoURL) {
            context.videoAction.loadVideoURL(videoURL);
        };

        // toggle by MarkdownToolbar
        var MarkdownComponent;
        if (this.state.readonly) {
            MarkdownComponent = <MarkdownPreview context={context} source={this.editorStore.getText()}/>;
        } else {
            MarkdownComponent = <MarkdownEditor context={context} source={this.editorStore.getText()}/>
        }
        return (
            <div className="App">
                <VideoInputField handleSubmit={onInputVideoURL}/>

                <div className="VideoViewer-container">
                    <VideoViewer context={context}
                                 videoURL={this.videoStore.getVideoURL()}
                                 trackURL={this.videoStore.getTrackURL()}
                                 quoteCommunicator={this.quoteCommunicator}/>
                    <VideoTranscript transcript={this.state.currentTranscript}/>
                </div>
                <div className="MarkdownEditor-container">
                    <MarkdownToolbar context={context}
                                     quoteCommunicator={this.quoteCommunicator}
                        />
                    {MarkdownComponent}
                </div>
            </div>
        )
    }
}

context.editorAction.changeReadonly(true);
React.render(<App/>, document.body);
