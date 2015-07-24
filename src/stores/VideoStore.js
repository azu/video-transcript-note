// LICENSE : MIT
"use strict";
import { Store } from "material-flux"
import { keys } from "../actions/VideoAction"
var path = require("path");
export default class VideoStore extends Store {
    constructor(context) {
        super(context);
        this.state = {
            currentTranscript: "",
            videoURL: null,
            trackURL: null
        };
        this.register(keys.updateTranscript, this.onUpdateTranscript);
        this.register(keys.loadVideoAndTrack, this.onLoadVideoAndTrack);
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

    onLoadVideoAndTrack(videoURL, trackURL) {
        this.setState({
            videoURL: videoURL,
            trackURL: trackURL
        });
    }

    onUpdateTranscript(text) {
        this.setState({
            currentTranscript: text
        });
    }
}