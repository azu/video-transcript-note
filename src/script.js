// LICENSE : MIT
"use strict";
var fs = require("fs");
import VideoController from "./video-controller";
import VideoPrefetcher from "./video-prefetcher";
import VideoTranscriptTracker from "./video-transcript-tracker.js";
import {rubyTranslate} from "./ruby-translator"
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
var transcriptContainer = document.getElementById("js-transcript");
var tracker = new VideoTranscriptTracker(videoElement);
tracker.onEnable(function () {
    console.log("enable:default");
});
tracker.onDisable(function () {
    console.log("disable");
    transcriptContainer.removeChild(transcriptContainer.firstElementChild);
});
tracker.onChange(function (text) {
    if (transcriptContainer.firstElementChild) {
        transcriptContainer.replaceChild(rubyTranslate(text), transcriptContainer.firstElementChild);
    } else {
        transcriptContainer.appendChild(rubyTranslate(text));
    }
});
tracker.start();