// LICENSE : MIT
"use strict";
export default class VideoController {
    constructor(shortCutTarget, video) {
        this.video = video;
        this.shortCutTarget = shortCutTarget;
        this.handleOnKeyDown = (event) => {
            this.onKeyCode(event, event.keyCode)
        }
    }

    start() {
        this.shortCutTarget.addEventListener("keydown", this.handleOnKeyDown);
    }

    stop() {
        this.shortCutTarget.removeEventListener("keydown", this.handleOnKeyDown);
    }

    onKeyCode(event, keyCode) {
        switch (keyCode) {
            case 32:// Space
                event.preventDefault();
                this.toggleVideo();
                break;
            case 38:// UP
                event.preventDefault();
                this.setVolume(0.1, 'up');
                break;
            case 40:// Down
                event.preventDefault();
                this.setVolume(0.1);
                break;
            case 39:// Right
                event.preventDefault();
                this.setPosition(10, 'forward');
                break;
            case 37:// Left
                event.preventDefault();
                this.setPosition(10);
                break;
            case 83:
                event.preventDefault();
                this.showHideSubs();
                break;
            case 13:// F
                event.preventDefault();
                this.fullScreen();
                break;
        }
    }

    getVideo() {
        return this.video;
    }

    setVideo(video) {
        this.video = video;
    }

    toggleVideo() {
        if (this.video.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }

    setVolume(value, type) {
        var vol = this.video.volume;
        if (type == 'up') {
            vol += value;
        } else {
            vol -= value;
        }
        if (vol >= 0 && vol <= 1) {
            this.video.volume = vol;
        } else {
            this.video.volume = (vol < 0) ? 0 : 1;
        }
    }

    setPosition(value, type) {
        var time = this.video.currentTime;
        var length = this.video.duration.toFixed(1);
        if (type == 'forward') {
            time += value;
        } else {
            time -= value;
        }
        if (time >= 0 && time <= length) {
            this.video.currentTime = time;
        } else {
            this.video.currentTime = (time < 0) ? 0 : length;
        }
    }

    showHideSubs() {
        if (this.video.textTracks[0].mode == 'showing') {
            this.video.textTracks[0].mode = 'hidden';
        } else {
            this.video.textTracks[0].mode = 'showing';
        }
    }

    fullScreen() {
        var isFull = (document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen) ? true : false;
        if (!isFull) {
            if (this.video.requestFullscreen) {
                this.video.requestFullscreen();
            } else if (this.video.mozRequestFullScreen) {
                this.video.mozRequestFullScreen();
            } else if (this.video.webkitRequestFullscreen) {
                this.video.webkitRequestFullscreen();
            }
        }
        else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }
}
