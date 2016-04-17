// LICENSE : MIT
"use strict";
import FileUtils from "../../../utils/FileUtils"
import UseCase from "../../framework/UseCase";
export default class SaveAsFileUseCase extends UseCase {
    static create() {
        return new this();
    }

    execute(filePath) {
        return new Promise(resolve => {
            if (filePath == null) {
                FileUtils.openSaveAs(filePath => {
                    return resolve(filePath);
                });
                return resolve(filePath);
            }
            return resolve(filePath);
        }).then(filePath => {
            const editor = this.editorRepository.lastUsed();
            return editor.saveAsFile(filePath, editor.text).then(() => {
                this.dispatch({
                    type: this.name,
                    filePath
                });
            });
        });
    }
}
