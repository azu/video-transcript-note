// LICENSE : MIT
"use strict";
import Store from "../../framework/Store"
import EditorState from "./EditorState";
export default class EditorStore extends Store {
    constructor({editorRepository}) {
        super();
        // initial load
        // this.onOpenFile(filePath);

        this.state = new EditorState();
        const lastTimeEditor = editorRepository.lastUsed();
        if (lastTimeEditor) {
            this.state = this.state.mergeEntity(lastTimeEditor);
        }
        editorRepository.onChange(() => {
            const editor = editorRepository.lastUsed();
            this.state = this.state.mergeEntity(editor);
            this.emitChange();
        });
        this.onDispatch(this.setState);
    }

    /**
     * @param {DispatcherPayload} payload
     */
    setState(payload) {
        const newState = this.state.reduce(payload);
        if (this.state !== newState) {
            this.state = newState;
            this.emitChange();
        }
    };

    getState() {
        return this.state;
    }
}