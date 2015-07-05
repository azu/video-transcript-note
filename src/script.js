// LICENSE : MIT
"use strict";
var fs = require("fs");
import VideoController from "./video-controller";
import VideoPrefetcher from "./video-prefetcher";
import VideoTranscriptTracker from "./video-transcript-tracker.js";
import {rubyTranslate} from "./ruby-translator/ruby-translator"
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
// transcript translator
var transcriptContainer = document.getElementById("js-transcript");
var tracker = new VideoTranscriptTracker(videoElement);
Array.from(videoElement.textTracks, track => {
    // hidden but could trace
    track.mode = "hidden";
});
tracker.onEnable(function () {
    console.log("enable:default");
});
tracker.onDisable(function () {
    console.log("disable");
    transcriptContainer.innerHTML = "";
});
tracker.onChange(function (text) {
    transcriptContainer.innerHTML = "";
    transcriptContainer.appendChild(rubyTranslate(text));
});
tracker.start();