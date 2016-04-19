// LICENSE : MIT
"use strict";
import UseCase from "../../framework/UseCase";
import editorRepository, {EditorRepository} from "../../infra/EditorRepository";
import Editor from "../../domain/Editor";
export default class CreateNewFileUseCase extends UseCase {
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

    execute(text) {
        const editor = new Editor({text});
        this.editorRepository.save(editor);
    }
}