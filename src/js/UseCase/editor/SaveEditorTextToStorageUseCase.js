// LICENSE : MIT
"use strict";
import UseCase from "../../framework/UseCase";
import editorRepository from "../../infra/EditorRepository";
export default class SaveEditorTextToStorageUseCase extends UseCase {
    static create() {
        return new this({editorRepository});
    }

    constructor({editorRepository}) {
        super();
        this.editorRepository = editorRepository;
    }

    // onSave
    execute(text) {
        const editor = this.editorRepository.lastUsed();
        editor.updateText(text);
        this.editorRepository.save(editor);
        this.dispatch({
            type: this.name,
            text
        });
    }
}