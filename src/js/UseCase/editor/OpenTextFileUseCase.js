// LICENSE : MIT
"use strict";
import FileUtils from "../../../utils/FileUtils"
import UseCase from "../../framework/UseCase";
import editorRepository, {EditorRepository} from "../../infra/EditorRepository";
export default class OpenTextFileUseCase extends UseCase {
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

    /*
    open file
    load file
    dispatch filePath and text
     */
    execute(filePath) {
        return new Promise(resolve => {
            if (filePath == null) {
                FileUtils.openFile(filePath => {
                    return resolve(filePath);
                });
                return resolve(filePath);
            }
            return resolve(filePath);
        }).then(filePath => {
            const editor = this.editorRepository.lastUsed();
            return editor.loadFile(filePath).then(text => {
                this.editorRepository.save(editor);
                this.dispatch({
                    type: this.name,
                    text,
                    filePath
                });
            });
        });
    }
}