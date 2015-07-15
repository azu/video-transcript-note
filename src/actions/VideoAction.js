// LICENSE : MIT
"use strict";
import { Action } from "material-flux"
import {findTrack} from "../utils/track-util"
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
        var findTrack2 = convertTrackAsync(videoURL, "srt");
        this.dispatch(keys.loadVideoURL, videoURL);
    }

    loadVideoAndTrack(videoURL, transcriptURL) {

    }
}