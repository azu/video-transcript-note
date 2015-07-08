// LICENSE : MIT
"use strict";
/**
 * capture current frame of the video, then return dataURL as a image.
 * @param {HTMLVideoElement} video
 * @returns {string}
 */
export function captureVideo(video) {
    var canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    var canvasContext = canvas.getContext("2d");
    canvasContext.drawImage(video, 0, 0);
    return canvas.toDataURL('image/png');
}