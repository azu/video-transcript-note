// LICENSE : MIT
"use strict";

// Related UseCase
import AddQuoteTextUseCase from "../../UseCase/editor/AddQuoteTextUseCase";
const InitialState = {
    filePath: null,
    text: "",
    readonly: false
};
export default class EditorState {
    /**
     * @param {Object} state
     */
    constructor(state = InitialState) {
        this.filePath = state.filePath || InitialState.filePath;
        this.text = state.text || InitialState.text;
        this.readonly = state.readonly || InitialState.readonly;
        // volatilization state - that effect at once.
        this.isAppendingQuoteText = state.isAppendingQuoteText || false
    }

    /**
     * @param {Editor} editor
     */
    mergeEntity(editor) {
        return new EditorState(Object.assign(this, {
            text: editor.text,
            filePath: editor.filePath,
            readonly: editor.readonly
        }));
    }

    reduce(payload) {
        switch (payload.type) {
            case AddQuoteTextUseCase.name:
                return new EditorState(Object.assign(this, {
                    isAppendingQuoteText: true
                }));
            default:
                return this;
        }
    }
}