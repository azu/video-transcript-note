// LICENSE : MIT
"use strict";
import Store from "../../framework/Store";
export default class ReduceStore extends Store {
    constructor() {
        super();
        this.state = {};
    }

    updateState(payload) {
        const nextState = this.reduce(this.state, payload);
        this.setState(nextState);
    }

    setState(state) {
        if (this.state === state) {
            return;
        }
        this.state = Object.assign({}, this.state, state);
        this.emitChange();
    }

    getState() {
        return this.state;
    }
}