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
            videoURL: "./videos/Matt Edelman - Nemo. The natural nodejs automation solution _ JSConf US 2015-1DoveeFXptY.mp4",
            trackURL: "./videos/Matt Edelman - Nemo. The natural nodejs automation solution _ JSConf US 2015-1DoveeFXptY.en.vtt"
        };
        this.register(keys.updateTranscript, this.onUpdateTranscript);
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

    onUpdateTranscript(text) {
        console.log(text);
        this.setState({
            currentTranscript: text
        });
    }
}