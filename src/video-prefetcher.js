"use strict";
/**
 * VideoPrefetcher prefetch video.src and replace video.src to completed object url.
 */
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
        this._onProgress = function _onProgress() {
        };
        this._onLoad = () => {
        };

    }

    start() {
        this.originalSrc = this.video.currentSrc;
        this.request = new XMLHttpRequest();
        this.request.open("GET", this.video.currentSrc);
        this.request.responseType = 'arraybuffer';
        this.request.addEventListener("progress", this._onProgress);
        var onLoad = (event)=> {
            if (this.request.status !== 200) {
                this._onLoad(new Error("Unexpected status code " + this.request.status + " for " + this.originalSrc));
                return;
            }
            console.log(this.video.currentType);
            var blob = new Blob([event.target.response], {
                type: this.video.currentType
            });
            this.video.src = window.URL.createObjectURL(blob);
            this.video.setAttribute("controls", "");
            this._onLoad(null, event);
            this.request.removeEventListener("progress", this._onProgress);
            this.request.removeEventListener("load", onLoad);
        };
        this.request.addEventListener("load", onLoad);
        this.request.onerror = () => {
            this._onLoad(new Error("Unexpected status code " + this.request.status + " for " + this.originalSrc));
        };
        this.request.send();
        this.video.removeAttribute("controls");
    }

    onProgress(callback) {
        this._onProgress = (event)=> {
            callback(null, event);
        };
    }

    onLoad(callback) {
        this._onLoad = callback;
    }

    stop() {
        this.video.setAttribute("controls", "");
        this.request.removeEventListener("progress", this._onProgress);
        this.request.removeEventListener("load", this._onLoad);
        this.request.abort();
    }
}