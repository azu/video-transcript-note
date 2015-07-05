"use strict";
/**
 * VideoTranscriptTrackerはTranscriptの変更を管理するクラスです。
 *
 */
export default class VideoTranscriptTracker {
    constructor(video) {
        this.video = video;
        this.handleCallback = null;
        this.handleCueChange = this._handleCueChange.bind(this);
    }

    onChange(callback) {
        this.handleCallback = callback;
    }

    start() {
        var tracks = this.video.textTracks;
        Array.from(tracks, this.observeTrack, this);
    }

    observeTrack(track) {
        track.addEventListener("cuechange", this.handleCueChange);
    }

    unObserveTrack(track) {
        track.removeEventListener("cuechange", this.handleCueChange);
    }

    _handleCueChange(event) {
        var myTrack = event.target;
        var myCues = myTrack.activeCues;      // activeCues is an array of current cues.
        if (myCues.length > 0) {
            Array.from(myCues, cue => this.handleCallback(cue.text, myTrack), this);
        }
    }

    stop() {
        var tracks = this.video.textTracks;
        Array.from(tracks, this.unObserveTrack, this);
    }
}