// LICENSE : MIT
"use strict";
import StoreGroup from "../framework/UILayer/StoreGroup";
import colorMixerRepository from "../infra/ColorMixerRepository";
import ColorStore from "./ColorStore";
import ColorHistoryStore from "./ColorHistoryStore";
import WallColorStore from "./WallColorStore";
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
            new ColorStore({colorMixerRepository}),
            new ColorHistoryStore({colorMixerRepository}),
            new WallColorStore()
        ];
    }
}