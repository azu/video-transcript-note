// LICENSE : MIT
"use strict";
var fs = require("fs");
import VideoController from "./video-controller";
import VideoPrefetcher from "./video-prefetcher";
import VideoTranscriptTracker from "./video-transcript-tracker.js";
// pass the current time to the update function which
// takes current time in seconds with fractions.
var videoElement = document.querySelector('#player');
videoElement.addEventListener('timeupdate', function (ev) {
    // this is 20.5 sec for 20 seconds and a bit into the video
});
var controller = new VideoController(document.body, videoElement);
var prefetcher = new VideoPrefetcher(videoElement);
prefetcher.setOnProgress(function (error, event) {
    var percentComplete = event.loaded / event.total;
    console.log((percentComplete * 100) + "%");
});
prefetcher.setOnLoad(function (error, event) {
    console.log("loaded", event);
});
prefetcher.start();
var tracker = new VideoTranscriptTracker(videoElement);