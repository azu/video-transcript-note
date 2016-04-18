"use strict";
import {EventEmitter} from "events"
/**
 * VideoPrefetcher prefetch video.src and replace video.src to completed object url.
 */
export default class VideoPrefetcher extends EventEmitter {
    static get eventTypes() {
        return {
            "load": "load",
            "progress": "progress",
            "abort": "abort",
            "error": "error"
        }
    }

    constructor(video) {
        super();
        if (!video) {
            throw new Error('pass video element as 1st arguments.\n e.g.) new VideoPrefetcher(videoElement);')
        }
        this.video = video;
        this.request = null;
        this.originalSrc = null;
    }

    start() {
        this.originalSrc = this.video.currentSrc;
        this.request = new XMLHttpRequest();
        this.request.open("GET", this.video.currentSrc);
        this.request.responseType = 'arraybuffer';
        this.request.addEventListener("progress", (event) => {
            this.emit(VideoPrefetcher.eventTypes.progress, event);
        });
        var onLoad = (event)=> {
            if (this.request.status !== 200) {
                this.emit(VideoPrefetcher.eventTypes.error, new Error("Unexpected status code " + this.request.status + " for " + this.originalSrc));
                return;
            }
            var blob = new Blob([event.target.response], {
                type: this.video.currentType
            });
            this.video.src = window.URL.createObjectURL(blob);
            this.video.setAttribute("controls", "");
            this.emit(VideoPrefetcher.eventTypes.load, event);
            this.request.removeEventListener("progress", (event) => {
                this.emit(VideoPrefetcher.eventTypes.progress, event);
            });
            this.request.removeEventListener("load", onLoad);
        };
        this.request.addEventListener("load", onLoad);
        this.request.onerror = () => {
            this.emit(VideoPrefetcher.eventTypes.error, new Error("Unexpected status code " + this.request.status + " for " + this.originalSrc));
        };
        this.request.send();
        this.video.removeAttribute("controls");
    }

    onProgress(callback) {
        this.on(VideoPrefetcher.eventTypes.progress, callback);
    }

    onLoad(callback) {
        this.on(VideoPrefetcher.eventTypes.load, callback);
    }

    stop() {
        this.video.setAttribute("controls", "");
        this.request.removeEventListener("progress", () => {
            this.removeAllListeners(VideoPrefetcher.eventTypes.progress);
        });
        this.request.removeEventListener("load", ()=> {
            this.removeAllListeners(VideoPrefetcher.eventTypes.load);
        });
        this.emit(VideoPrefetcher.eventTypes.abort);
        this.request.abort();
    }
}