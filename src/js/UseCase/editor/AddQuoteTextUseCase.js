// LICENSE : MIT
"use strict";
import UseCase from "../../framework/UseCase";
export default class AddQuoteTextUseCase extends UseCase {
    static create() {
        return new this();
    }

    execute(text) {
        this.dispatch({
            type: this.name,
            quoteText: text
        })
    }
}