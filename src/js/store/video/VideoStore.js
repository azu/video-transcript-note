// LICENSE : MIT
"use strict";
const path = require("path");
import Store from "../../framework/Store"
import VideoState from "./VideoState";
export default class VideoStore extends Store {
    constructor(context) {
        super(context);
        this.state = new VideoState();
        this.onDispatch(this.setState);
    }

    /**
     * @param {DispatcherPayload} payload
     */
    setState(payload) {
        this.state = this.state.reduce(payload);
        this.emitChange();
    };

    getState(){
        return this.state;
    }
    getVideoName() {
        return path.basename(this.state.videoURL, '.mp4');
    }

    getVideoURL() {
        return this.state.videoURL;
    }

    getTrackURL() {
        return this.state.trackURL;
    }

    getCurrentTranscript() {
        return this.state.currentTranscript;
    }
}