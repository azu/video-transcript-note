// LICENSE : MIT
"use strict";
var React = require("react");
var MarkdownToolbar = require("./components/MarkdownToolbar");
var MarkdownEditor = require("./components/MarkdownEditor");
var MarkdownPreview = require("./components/MarkdownPreview");
import VideoTranscript from "./components/VideoTranscript"
import VideoViewer from "./components/VideoViewer"
import MainContext from "./MainContext"
var context = new MainContext();
class App extends React.Component {
    constructor(props) {
        super(props);
        this.editorStore = context.editorStore;
        this.videoStore = context.videoStore;
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
        console.log(this.videoStore.getCurrentTranscript());
        this.setState({
            currentTranscript: this.videoStore.getCurrentTranscript()
        });
    }

    componentWillUnmount() {
        this.videoStore.removeAllChangeListeners();
        this.editorStore.removeAllChangeListeners();
    }

    render() {
        // toggle by MarkdownToolbar
        var MarkdownComponent;
        if (this.state.readonly) {
            MarkdownComponent = <MarkdownPreview context={context} source={this.editorStore.getText()}/>;
        } else {
            MarkdownComponent = <MarkdownEditor context={context} source={this.editorStore.getText()}/>
        }
        return (
            <div className="App">
                <div className="VideoViewer-container">
                    <VideoViewer context={context}
                                 videoURL="./videos/Matt Edelman - Nemo. The natural nodejs automation solution _ JSConf US 2015-1DoveeFXptY.mp4"
                                 trackURL="./videos/Matt Edelman - Nemo. The natural nodejs automation solution _ JSConf US 2015-1DoveeFXptY.en.vtt"/>
                    <VideoTranscript transcript={this.state.currentTranscript}/>
                </div>
                <div className="MarkdownEditor-container">
                    <MarkdownToolbar context={context}/>
                    {MarkdownComponent}
                </div>
            </div>
        )
    }
}

context.editorAction.changeReadonly(true);
React.render(<App/>, document.body);
