// LICENSE : MIT
"use strict";
import Store from "../framework/Store";
import ColorHistory from "../domain/ColorHistory";
const initialState = {
    colorHistory: new ColorHistory()
};
/**
 * Simple Store pattern
 */
export default class ColorHistoryStore extends Store {
    /**
     * @param {ColorMixerRepository} colorMixerRepository
     */
    constructor({colorMixerRepository}) {
        super();
        this.colorMixerRepository = colorMixerRepository;
        this.colorMixerRepository.onChange(() => this.emitChange());
        // State pattern
        // this.onDispatch("ChangeColorUseCase", () => this.emitChange());
    }


    getState(prevState = initialState) {
        const colorMixer = this.colorMixerRepository.lastUsed();
        const colorHistory = colorMixer.getHistory();
        return {
            colorHistory
        };
    }
}