// LICENSE : MIT
"use strict";
const assert = require("assert");
import CoreEventEmitter from "./CoreEventEmitter";
import StoreGroup from "./UILayer/StoreGroup";
import UseCase from "./UseCase";
import UseCaseExecutor  from "./UseCaseExecutor";
import StoreGroupValidator from "./UILayer/StoreGroupValidator";
const CONTEXT_ON_CHANGE = "CONTEXT_ON_CHANGE";
export default class Context extends CoreEventEmitter {
    /**
     * @param {Dispatcher} dispatcher
     * @param {StoreGroup|Store} store
     */
    constructor({dispatcher, store}) {
        super();
        StoreGroupValidator.validateInstance(store);
        // central dispatcher
        this._dispatcher = dispatcher;
        this._storeGroup = store;

        // delegate dispatcher event.
        // It it for Store.
        // Dispatcher -> Store
        // StoreGroup already delete event to store*s* when it was initialized.
        // Dispatcher -> | StoreGroup | -> Store*s*
        this.releaseDispacherEvent = this._dispatcher.pipe(this._storeGroup);
    }

    /**
     * return state value of StoreGroup.
     * @returns {*} states object of stores
     */
    getState() {
        return this._storeGroup.getState();
    }

    /**
     * if anyone store is changed, then call onChangeHandler
     * @param {function(changingStores: Store[])} onChangeHandler
     * @return {Function} release handler function.
     */
    onChange(onChangeHandler) {
        return this._storeGroup.onChange(onChangeHandler);
    }

    /**
     * @param {UseCase} useCase
     * @returns {UseCaseExecutor}
     * @example
     *
     * context.useCase(UseCaseFactory.create()).execute(args);
     */
    useCase(useCase) {
        assert(useCase instanceof UseCase, `It should instance of UseCase: ${useCase}`);
        return new UseCaseExecutor(useCase, this._dispatcher);
    }

    /**
     * release all events handler.
     * You can call this when no more call event handler
     */
    release() {
        if (typeof this._storeGroup === "function") {
            this._storeGroup.release();
        }
        if (typeof this.releaseDispacherEvent === "function") {
            this.releaseDispacherEvent();
        }
    }
}