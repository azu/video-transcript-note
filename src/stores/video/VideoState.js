// LICENSE : MIT
"use strict";
const path = require("path");
const InitialState = {
    currentTranscript: "",
    videoURL: null,
    trackURL: null
};
export default class VideoState {
    /**
     * @param {Object} state
     */
    constructor(state = InitialState) {
        this.currentTranscript = state.currentTranscript || "";
        this.videoURL = state.videoURL;
        this.trackURL = state.trackURL;
    }

    get videoName() {
        return path.basename(this.videoURL, '.mp4');

    }

    reduce(payload) {
        switch (payload.type) {
            case "onLoadVideoAndTrack":
                return new VideoState({
                    trackURL: payload.trackURL,
                    videoURL: payload.videoURL
                });
            case "onUpdateTranscript":
                return new VideoState(Object.assign(this, {
                    currentTranscript: payload.text
                }));
            default:
                return this;
        }
    }
}