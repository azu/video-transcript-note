// LICENSE : MIT
"use strict";
import { Action } from "material-flux"
import {convertTrackAsync} from "../utils/track-util"
export var keys = {
    updateTranscript: Symbol("updateTranscript"),
    loadVideoURL: Symbol("loadVideoURL"),
    loadVideoAndTrack: Symbol("loadVideoAndTrack")
};
export default class VideoAction extends Action {
    updateTranscript(text) {
        this.dispatch(keys.updateTranscript, text);
    }

    loadVideoURL(videoURL) {
        convertTrackAsync(videoURL).then(trackURL => {
            this.loadVideoAndTrack(videoURL, trackURL)
        });
    }

    loadVideoAndTrack(videoURL, trackURL) {
        this.dispatch(keys.loadVideoAndTrack, videoURL, trackURL);
    }
}