// LICENSE : MIT
"use strict";
var fs = require("fs");
import VideoController from "./video-controller";
import VideoPrefetcher from "./video-prefetcher";
import VideoTranscriptTracker from "./video-transcript-tracker.js";
var videoElement = document.querySelector('#player');
var controller = new VideoController(document.body, videoElement);
var prefetcher = new VideoPrefetcher(videoElement);
prefetcher.onProgress(function (error, event) {
    var percentComplete = event.loaded / event.total;
    console.log((percentComplete * 100) + "%");
});
prefetcher.onLoad(function (error, event) {
    console.log("loaded", event);
});
prefetcher.start();
var tracker = new VideoTranscriptTracker(videoElement);
tracker.onChange(function (text) {
    console.log(text);
});
tracker.start();