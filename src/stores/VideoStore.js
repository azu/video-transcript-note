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
            videoURL: "./videos/Kate Hudson - Beyond Responsive - Building a mobile web you're f_ing proud of _ JSConf US 2015-Y4ZTRztwLrg.mp4",
            trackURL: "./videos/Kate Hudson - Beyond Responsive - Building a mobile web you're f_ing proud of _ JSConf US 2015-Y4ZTRztwLrg.en.vtt"
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
        this.setState({
            currentTranscript: text
        });
    }
}