// LICENSE : MIT
"use strict";
import UseCase from "../../framework/UseCase";
export default class SaveEditorTextToStorageUseCase extends UseCase {
    static create() {
        return new this();
    }

    // onSave
    execute(text) {
        this.dispatch({
            type: this.name,
            text
        })
    }
}