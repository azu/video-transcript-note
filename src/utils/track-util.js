// LICENSE : MIT
"use strict";
import fs from "fs";
import path from "path";
import srt2vtt from "srt2vtt";
export function findTrack() {

}
export function convertTrackAsync(videoPath) {
    return new Promise((resolve, reject)=> {
        var trackURL = expectSRTTrackPath(videoPath);
        var srtData = fs.readFileSync(trackURL);
        srt2vtt(srtData, function (err, vttData) {
            if (err) {
                reject(new Error(err));
            }
            fs.writeFileSync(expectVTTTrackPath(videoPath), vttData);
        });
    });
}
/**
 * srtのファイルを推測して取り出す
 * @param videoPath
 * @returns {string|*}
 */
export function expectSRTTrackPath(videoPath) {
    var pathObject = path.parse(videoPath);
    return path.join(pathObject.dir, pathObject.name, "srt");
}
export function expectVTTTrackPath(videoPath) {
    var pathObject = path.parse(videoPath);
    return path.join(pathObject.dir, pathObject.name, "vtt");
}