// LICENSE : MIT
"use strict";
import FileUtils from "../../../utils/FileUtils"
import UseCase from "../../framework/UseCase";
import editorRepository, {EditorRepository} from "../../infra/EditorRepository";
export default class SaveAsFileUseCase extends UseCase {
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

    execute(filePath) {
        return new Promise((resolve) => {
            if (filePath == null) {
                FileUtils.openSaveAs(filePath => {
                    return resolve(filePath);
                });
            } else {
                return resolve(filePath);
            }
        }).then(filePath => {
            const editor = this.editorRepository.lastUsed();
            return editor.saveAsFile(filePath).then(() => {
                this.editorRepository.save(editor);
                this.dispatch({
                    type: this.name,
                    filePath
                });
            });
        });
    }
}
