"use strict";
export default class VideoTranscriptTracker {
    constructor(video) {
        this.video = video;
        var track = this.video.textTracks[0];
        console.log(track);
        track.addEventListener("cuechange", function () {
            var myTrack = track;             // track element is "this"
            var myCues = myTrack.activeCues;      // activeCues is an array of current cues.
            console.log(myCues)
            if (myCues.length > 0) {
                [].slice.call(myCues).forEach(cue => console.log(cue.text));
            }
        });
    }
}