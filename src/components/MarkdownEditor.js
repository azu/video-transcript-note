// LICENSE : MIT
"use strict";
var React = require("react");
var ReactCodeMirror = require("react-code-mirror");
require("codemirror/addon/mode/overlay.js");
require("codemirror/mode/xml/xml.js");
require("codemirror/mode/markdown/markdown.js");
require("codemirror/mode/gfm/gfm.js");
require("codemirror/mode/javascript/javascript.js");
require("codemirror/mode/css/css.js");
require("codemirror/mode/htmlmixed/htmlmixed.js");
require("codemirror/mode/clike/clike.js");
require("codemirror/mode/meta.js");
require("codemirror/addon/edit/continuelist.js");


import EditorState from "../js/store/editor/EditorState";
import AppContextLocator from "../AppContextLocator";
import SaveEditorTextToStorageUseCase from "../js/UseCase/editor/SaveEditorTextToStorageUseCase";
import SaveAsFileUseCase from "../js/UseCase/editor/SaveAsFileUseCase";
import CreateNewFileUseCase from "../js/UseCase/editor/CreateNewFileUseCase";
import OpenTextFileUseCase from "../js/UseCase/editor/OpenTextFileUseCase";
function scrollToBottom(cm) {
    var line = cm.lineCount();
    cm.setCursor({line: line, ch: 0});
    var myHeight = cm.getScrollInfo().clientHeight;
    var coords = cm.charCoords({line: line, ch: 0}, "local");
    cm.scrollTo(null, (coords.top + coords.bottom - myHeight) / 2);
}
export default class MarkdownEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        };
        /**
         * @type {EditorStore}
         */
        const editorState = this.props.editorState;
        // TODO: don't work
        // need MMVM messenger pattern?
        // this.editorStore.on("quote", (quoteText)=> {
        //     setTimeout(()=> {
        //         scrollToBottom(this.editor);
        //     }, 64);
        // });
        var quote = ()=> {
            this.props.quote();
        };
        var saveFile = ()=> {
            const filePath = editorState.filePath;
            AppContextLocator.context.useCase(SaveAsFileUseCase.create()).execute(filePath)
        };
        var createNewFile = ()=> {
            AppContextLocator.context.useCase(CreateNewFileUseCase.create()).execute();
        };
        var openFile = ()=> {
            AppContextLocator.context.useCase(OpenTextFileUseCase.create()).execute();
        };
        this.extraKeys = {
            "Cmd-T": quote,
            "Ctrl-T": quote,
            "Cmd-S": saveFile,
            "Ctrl-S": saveFile,
            "Cmd-N": createNewFile,
            "Ctrl-N": createNewFile,
            "Cmd-O": openFile,
            "Ctrl-O": openFile,
            "Enter": "newlineAndIndentContinueMarkdownList"
        };
        this.debounceOnChange = this._codeMirrorOnChange.bind(this);
    }

    componentDidMount() {
        var nodes = React.findDOMNode(this);
        this.editor = nodes.querySelector(".CodeMirror").CodeMirror;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.editorState.text !== this.state.text) {
            this.isChanging = true;
            this.setState({
                text: nextProps.editorState.text
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.isChanging || nextProps.editorState.text !== nextState.text;
    }

    _codeMirrorOnChange(result) {
        var text = result.target.value;
        this.setState({
            text
        });
        AppContextLocator.context.useCase(SaveEditorTextToStorageUseCase.create()).execute(text);
    }

    render() {
        return <div className="MarkdownEditor">
            <ReactCodeMirror value={this.state.text}
                             mode="gfm"
                             lineWrapping="true"
                             lineNumbers="true"
                             extraKeys={this.extraKeys}
                             onChange={this.debounceOnChange}/>
        </div>

    }
}
MarkdownEditor.propTypes = {
    editorState: React.PropTypes.instanceOf(EditorState).isRequired
};
