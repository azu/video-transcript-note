// LICENSE : MIT
"use strict";
import ReduceStore from "./store-pattern/ReduceStore";
import Color from "../domain/value/Color";

/*
    Separate Store and State class pattern

    Implementation Note:

    Current, StoreGroup use `XXXStore` as key, is not `XXXState`.
    
 */
export class ColorState {
    /**
     * @param {Color} currentColor
     */
    constructor({currentColor}) {
        this.currentColor = currentColor;
    }

    reduce(payload) {
        switch (payload.type) {
            case "colorMixerRepository":
                return new ColorState({currentColor: payload.color});
            default:
                return this;
        }
    }
}
export default class ColorStore extends ReduceStore {
    /**
     * @param {ColorMixerRepository} colorMixerRepository
     */
    constructor({colorMixerRepository}) {
        super();
        this.state = new ColorState({
            currentColor: new Color({hexCode: "#fff"})
        });
        // from Repository
        colorMixerRepository.onChange(() => {
            const color = colorMixerRepository.lastUsed().currentColor();
            this.state = this.state.reduce({
                type: "colorMixerRepository",
                color
            });
            this.emitChange();
        });
        /*

        this.onDispatch(payload => {
            this.setState(this.state.reduce(payload));
        });
         */
    }
}