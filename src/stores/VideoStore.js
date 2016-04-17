// LICENSE : MIT
"use strict";
const path = require("path");
import {Store} from "material-flux"
import {keys} from "../actions/VideoAction"
import VideoState from "./video/VideoState";
export default class VideoStore extends Store {
    constructor(context) {
        super(context);
        this.state = new VideoState();
        this.register(keys.updateTranscript, this.onUpdateTranscript);
        this.register(keys.loadVideoAndTrack, this.onLoadVideoAndTrack);
    }

    /**
     * @param {DispatcherPayload} payload
     */
    setState(payload) {
        this.state = this.state.reduce(payload);
        this.emit("change");
    };

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

    onLoadVideoAndTrack(videoURL, trackURL) {
        this.setState({
            type: "onLoadVideoAndTrack",
            videoURL: videoURL,
            trackURL: trackURL
        });
    }

    onUpdateTranscript(text) {
        this.setState({
            type: "onUpdateTranscript",
            text
        });
    }
}