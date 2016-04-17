// LICENSE : MIT
"use strict";
import FileUtils from "../../../utils/FileUtils"
import UseCase from "../../framework/UseCase";
export default class SaveAsFileUseCase extends UseCase {
    static create() {
        return new this();
    }

    execute(filePath) {
        if (filePath == null) {
            FileUtils.openSaveAs(filePath => {
                this.dispatch({
                    type: SaveAsFileUseCase.name,
                    filePath
                });
            });
        } else {
            this.dispatch({
                type: SaveAsFileUseCase.name,
                filePath
            });
        }
    }
}
