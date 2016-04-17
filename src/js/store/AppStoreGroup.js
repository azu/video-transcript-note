// LICENSE : MIT
"use strict";
import StoreGroup from "../framework/UILayer/StoreGroup";
import EditorStore from "./editor/EditorStore";
import editorRepository from "../infra/EditorRepository";
export default class AppStoreGroup {
    /**
     * @param {Dispatcher} dispatcher
     * @returns {StoreGroup}
     */
    constructor(dispatcher) {
        return new StoreGroup({
            stores: AppStoreGroup.create(),
            dispatcher
        });
    }

    /**
     * StateStore array
     * @type {Store[]}
     */
    static create() {
        return [
            new EditorStore({editorRepository})
        ];
    }
}