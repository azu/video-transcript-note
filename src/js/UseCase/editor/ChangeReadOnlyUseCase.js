// LICENSE : MIT
"use strict";
import UseCase from "../../framework/UseCase";
export default class MakeReadOnlyUseCase extends UseCase {
    static create() {
        return new this();
    }

    /**
     * @param {boolean} readonly
     */
    execute(readonly) {
        this.dispatch({
            type: this.name,
            readonly
        })
    }
}