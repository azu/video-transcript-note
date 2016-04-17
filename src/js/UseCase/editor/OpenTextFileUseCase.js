// LICENSE : MIT
"use strict";
import FileUtils from "../../../utils/FileUtils"
import UseCase from "../../framework/UseCase";
export default class OpenTextFileUseCase extends UseCase {
    static create() {
        return new this();
    }

    execute(filePath) {
        return new Promise(resolve => {
            if (filePath == null) {
                FileUtils.openFile(filePath => {
                    this.dispatch({
                        type: this.name,
                        filePath
                    });
                });
                return resolve();
            }
            this.dispatch({
                type: this.name,
                filePath
            });
            return resolve();
        });
    }
}