"use strict";
import React from "react";
import EditorState from "../js/store/editor/EditorState";
import AppContextLocator from "../AppContextLocator";
import CreateNewFileUseCase from "../js/UseCase/editor/CreateNewFileUseCase";
import OpenTextFileUseCase from "../js/UseCase/editor/OpenTextFileUseCase";
import ChangeReadOnlyUseCase from "../js/UseCase/editor/ChangeReadOnlyUseCase";
import SaveAsFileUseCase from "../js/UseCase/editor/SaveAsFileUseCase";
export default class MarkdownToolbar extends React.Component {
    onQuote() {
        this.props.quote();
    }

    onCreateNewFile() {
        AppContextLocator.context.useCase(CreateNewFileUseCase.create()).execute();
    }

    onOpen() {
        AppContextLocator.context.useCase(OpenTextFileUseCase.create()).execute();
    }

    onSave() {
        /**
         * @type {EditorState}
         */
        const editorState = this.props.editorState;
        const filePath = editorState.filePath;
        AppContextLocator.context.useCase(SaveAsFileUseCase.create()).execute(filePath);
    }

    onChangeMode(isReadonly) {
        AppContextLocator.context.useCase(ChangeReadOnlyUseCase.create()).execute(isReadonly);
    }

    render() {
        /**
         * @type {EditorState}
         */
        const editorState = this.props.editorState;
        if (editorState.readonly) {
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
MarkdownToolbar.propTypes = {
    editorState: React.PropTypes.instanceOf(EditorState).isRequired
};
