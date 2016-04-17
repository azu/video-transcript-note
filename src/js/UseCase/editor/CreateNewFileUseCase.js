// LICENSE : MIT
"use strict";
import UseCase from "../../framework/UseCase";
export default class CreateNewFileUseCase extends UseCase {
    static create() {
        return new this();
    }

    execute(text) {
        this.dispatch({
            type: this.name
        })
    }
}