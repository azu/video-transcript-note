// LICENSE : MIT
"use strict";
import UseCase from "../../framework/UseCase";
import editorRepository, {EditorRepository} from "../../infra/EditorRepository";
export default class MakeReadOnlyUseCase extends UseCase {
    static create() {
        return new this({editorRepository});
    }

    /**
     * @param {EditorRepository} editorRepository
     */
    constructor({editorRepository}) {
        super();
        this.editorRepository = editorRepository;
    }


    /**
     * @param {boolean} readonly
     */
    execute(readonly) {
        const editor = this.editorRepository.lastUsed();
        editor.setReadonlyState(readonly);
        this.editorRepository.save(editor);
    }
}