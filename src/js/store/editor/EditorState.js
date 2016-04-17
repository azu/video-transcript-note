// LICENSE : MIT
"use strict";

// Related UseCase
import AddQuoteTextUseCase from "../../UseCase/editor/AddQuoteTextUseCase";
import ChangeReadOnlyUseCase from "../../UseCase/editor/ChangeReadOnlyUseCase";
import CreateNewFileUseCase from "../../UseCase/editor/CreateNewFileUseCase";
import OpenTextFileUseCase from "../../UseCase/editor/OpenTextFileUseCase";
import SaveAsFileUseCase from "../../UseCase/editor/SaveAsFileUseCase";
import SaveEditorTextToStorageUseCase from "../../UseCase/editor/SaveEditorTextToStorageUseCase";
import SaveImageDataUseCase from "../../UseCase/editor/SaveImageDataUseCase";
const InitialState = {
    filePath: null,
    text: "",
    quoteText: "",
    readonly: false
};
export default class EditorState {
    /**
     * @param {Object} state
     */
    constructor(state = InitialState) {
        this.filePath = state.filePath || InitialState.filePath;
        this.text = state.text || InitialState.text;
        this.quoteText = state.quoteText || InitialState.quoteText;
        this.readonly = state.readonly || InitialState.readonly;
    }

    reduce(payload) {
        console.log(payload);
        switch (payload.type) {
            case CreateNewFileUseCase.name:
                return new EditorState();
            case OpenTextFileUseCase.name:
                return new EditorState({
                    text: payload.text,
                    filePath: payload.filePath
                });
            case SaveAsFileUseCase.name:
                return new EditorState(Object.assign(this, {
                    filePath: payload.filePath
                }));
            case SaveEditorTextToStorageUseCase.name:
                return new EditorState(Object.assign(this, {
                    text: payload.text
                }));
            case AddQuoteTextUseCase.na:
                return new EditorState(Object.assign(this, {
                    text: this.text + "\n" + payload.quoteText,
                    quoteText: payload.quoteText
                }));
            case ChangeReadOnlyUseCase.name:
                return new EditorState(Object.assign(this, {
                    readonly: payload.readonly
                }));
            default:
                return this;
        }
    }
}