"use strict";
import React from "react";
import path from "path";
export default class MarkdownToolbar extends React.Component {
    onQuote() {
        this.props.quoteCommunicator.quoteImage((dataURL)=> {
            var { context } = this.props;
            var videoName = context.videoStore.getVideoName();
            context.editorAction.saveImage(videoName + ".png", dataURL);
        });
    }

    onCreateNewFile() {
        var { context } = this.props;
        context.editorAction.createNewFile();
    }

    onOpen() {
        var { context } = this.props;
        context.editorAction.openFile();
    }

    onSave() {
        var { editorStore, editorAction } = this.props.context;
        var filePath = editorStore.getFilePath();
        editorAction.saveAsFile(filePath);
    }

    onChangeMode(isReadonly) {
        var { editorAction } = this.props.context;
        editorAction.changeReadonly(isReadonly);
    }

    render() {
        var { editorStore } = this.props.context;
        if (editorStore.isReadonly()) {
            return (
                <div className="MemoToolbar">
                    <button onClick={this.onChangeMode.bind(this,false)}><span className="fa fa-pencil">Editor</span>
                    </button>
                </div>
            )
        } else {
            return (
                <div className="MemoToolbar">
                    <button onClick={this.onQuote.bind(this)}><span className="fa fa-quote-right">Quote</span></button>
                    <button onClick={this.onCreateNewFile.bind(this)}><span className="fa fa-plus">New File</span>
                    </button>
                    <button onClick={this.onOpen.bind(this)}><span className="fa fa-folder-open-o">Open</span></button>
                    <button onClick={this.onSave.bind(this)}><span className="fa fa-floppy-o">Save</span></button>
                    <button onClick={this.onChangeMode.bind(this,true)}><span className="fa fa-eye">Preview</span>
                    </button>
                </div>
            )
        }
    }
}