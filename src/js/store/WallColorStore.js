// LICENSE : MIT
"use strict";
import ReduceStore from "./store-pattern/ReduceStore";
import {ChangeWallColorUseCase} from "../UseCase/ChangeWallColor";
import RGBAColor from "../../js/domain/value/RGBAColor";
/**
 * Reduce Store pattern
 */
export default class WallColorStore extends ReduceStore {
    constructor() {
        super();
        this.state = {
            wallColor: new RGBAColor({rgba: "rgba(0, 0, 0, 0)"})
        };
        // from useCase
        this.onDispatch(payload => {
            this.updateState(payload);
        });
    }

    reduce(prevState, payload) {
        switch (payload.type) {
            case ChangeWallColorUseCase.name:
                return {wallColor: payload.color};
            default:
                return prevState;
        }
    }
}