// LICENSE : MIT
"use strict";
const path = require("path");
import Store from "../../framework/Store"
import VideoState from "./VideoState";
export default class VideoStore extends Store {
    constructor() {
        super();
        this.state = new VideoState({
            trackURL: "sample/sintel-short-en.vtt",
            videoURL: "sample/sintel-short.mp4"
        });
        this.onDispatch(this.setState);
    }

    /**
     * @param {DispatcherPayload} payload
     */
    setState(payload) {
        this.state = this.state.reduce(payload);
        this.emitChange();
    };

    getState() {
        return this.state;
    }
}