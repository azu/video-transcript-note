// LICENSE : MIT
"use strict";
import UseCase from "../../framework/UseCase";
export default class SaveImageDataUseCase extends UseCase {
    static create() {
        return new this();
    }

    execute(data) {
        this.dispatch({
            type: this.name,
            data
        })
    }
}