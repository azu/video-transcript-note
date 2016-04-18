// LICENSE : MIT
"use strict";
import LoadVideoAndTrackURL from "../../UseCase/video/LoadVideoAndTrackURL";
import LoadVideoFromFileURL from "../../UseCase/video/LoadVideoFromFileURL";
import UpdateTranscript from "../../UseCase/video/UpdateTranscript";
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

    reduce(payload) {
        switch (payload.type) {
            case LoadVideoFromFileURL.name:
                return new VideoState({
                    videoURL: payload.videoURL
                });

            case LoadVideoAndTrackURL.name:
                return new VideoState({
                    trackURL: payload.trackURL,
                    videoURL: payload.videoURL
                });
            case UpdateTranscript.name:
                return new VideoState(Object.assign(this, {
                    currentTranscript: payload.text
                }));
            default:
                return this;
        }
    }
}