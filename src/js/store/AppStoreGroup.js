// LICENSE : MIT
"use strict";
import StoreGroup from "../framework/UILayer/StoreGroup";
import EditorStore from "./editor/EditorStore";
import VideoStore from "./video/VideoStore";
import editorRepository from "../infra/EditorRepository";
import videoRepository from "../infra/VideoRepository";
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
            new EditorStore({editorRepository}),
            new VideoStore({videoRepository})
        ];
    }
}