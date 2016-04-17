// LICENSE : MIT
"use strict";
import UseCase from "../../framework/UseCase";
export default class LoadVideoAndTrackURL extends UseCase {
    static create() {
        return new this();
    }

    execute(videoURL, trackURL) {
        this.dispatch({
            type: this.name,
            videoURL,
            trackURL
        });
    }
}