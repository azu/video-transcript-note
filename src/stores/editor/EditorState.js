// LICENSE : MIT
"use strict";
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
        this.filePath = state.filePath;
        this.text = state.text;
        this.quoteText = state.quoteText;
        this.readonly = state.readonly;
    }

    reduce(payload) {
        switch (payload.type) {
            case "onCreateNewFile":
                return new EditorState();
            case "onOpenFile":
                return new EditorState({
                    text: payload.text,
                    filePath: payload.filePath
                });
            case "onSaveAsFile":
                return new EditorState(Object.assign(this, {
                    filePath: payload.filePath
                }));
            case "onSave":
                return new EditorState(Object.assign(this, {
                    text: payload.text
                }));
            case "onQuote":
                return new EditorState(Object.assign(this, {
                    text: this.text + "\n" + payload.quoteText,
                    quoteText: payload.quoteText
                }));
            case "onReadonly":
                return new EditorState(Object.assign(this, {
                    readonly: payload.readonly
                }));
            default:
                return this;
        }
    }
}