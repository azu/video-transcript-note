"use strict";
/**
 * VideoTranscriptTrackerはTranscriptの変更を管理するクラスです。
 */
export default class VideoTranscriptTracker {
    constructor(video) {
        this.video = video;
        this.handleCueChangeCallback = null;
        this.handleEnableCallback = null;
        this.handleDisableCallback = null;
        this.handleCueChange = this._handleCueChange.bind(this);
        this.handleChange = this._handleChange.bind(this);
    }

    onChange(callback) {
        this.handleCueChangeCallback = callback;
    }

    onEnable(callback) {
        this.handleEnableCallback = callback;
    }

    onDisable(callback) {
        this.handleDisableCallback = callback;
    }

    _handleChange() {
        var availableTracks = Array.from(this.video.textTracks).filter(track => {
            if (track.subtitles !== "subtitles") {
                return false
            }
            return track.mode === "Showing";
        });
        if (availableTracks.length === 0) {
            if (this.handleDisableCallback) {
                this.handleDisableCallback();
            }
        } else {
            if (this.handleEnableCallback) {
                this.handleEnableCallback(availableTracks);
            }
        }
    }


    start() {
        var tracks = this.video.textTracks;
        tracks.addEventListener("change", this.handleChange);
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
            Array.from(myCues, cue => this.handleCueChangeCallback(cue.text, myTrack), this);
        }
    }

    stop() {
        var tracks = this.video.textTracks;
        Array.from(tracks, this.unObserveTrack, this);
    }
}