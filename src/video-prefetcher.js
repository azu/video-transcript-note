"use strict";
export default class VideoPrefetcher {
    constructor(video) {
        if (!video) {
            throw new Error(`pass video element as 1st arguments.
e.g.) new VideoPrefetcher(videoElement);`)
        }
        this.video = video;
        this.request = null;
        this.originalSrc = null;
        // default
        this.onProgress = function onProgress() {
        };
        this.onLoad = () => {
        };

    }

    start() {
        this.originalSrc = this.video.currentSrc;
        this.request = new XMLHttpRequest();
        this.request.open("GET", this.video.currentSrc);
        this.request.responseType = 'arraybuffer';
        this.request.addEventListener("progress", this.onProgress);
        this.request.addEventListener("load", (event)=> {
            if (this.request.status != 200) {
                this.onLoad(new Error("Unexpected status code " + xhr.status + " for " + this.originalSrc));
                return;
            }
            console.log(this.video.currentType);
            var blob = new Blob([event.target.response], {
                type: this.video.currentType
            });
            this.video.src = window.URL.createObjectURL(blob);
            this.video.setAttribute("controls", "");
            this.onLoad(null, event);
        });
        this.request.send();
        this.video.removeAttribute("controls");
    }

    setOnProgress(callback) {
        this.onProgress = (event)=> {
            callback(null, event);
        };
    }

    setOnLoad(callback) {
        this.onLoad = callback;
    }

    stop() {
        this.video.setAttribute("controls", "");
        this.request.removeEventListener("progress", this.onProgress);
        this.request.removeEventListener("load", this.onLoad);
        this.request.abort();
    }
}