// LICENSE : MIT
"use strict";
import fs from "fs";
import path from "path";
import srt2vtt from "srt2vtt";
export function existFile(filePath) => {
    try {
        fs.accessSync(filePath);
        return true;
    } catch (error) {
        return false
    }
}
export function convertTrackAsync(videoPath) {
    return new Promise((resolve, reject)=> {
        var vttTrack = findTrack(videoPath, "vtt");
        if (vttTrack) {
            return vttTrack;
        }
        var srtTrack = findTrack(videoPath, "srt");
        if (!srtTrack) {
            console.log(videoPath + "に対するsrt/vttファイルが見つかりません")
        }
        var srtData = fs.readFileSync(srtTrack);
        srt2vtt(srtData, function (err, vttData) {
            if (err) {
                reject(new Error(err));
            }
            var srtFile = expectVTTTrackPath(videoPath);
            fs.writeFileSync(srtFile, vttData);
            resolve(srtFile)
        });
    });
}

export function findTrack(videoURL, extension) {
    var pathObject = path.parse(videoURL);
    if (existFile(path.join(pathObject.dir, pathObject.name) + "." + extension)) {
        return path.join(pathObject.dir, pathObject.name) + "." + extension
    }
    if (existFile(path.join(pathObject.dir, pathObject.name) + ".en." + extension)) {
        return path.join(pathObject.dir, pathObject.name) + ".en." + extension
    }
}
export function expectVTTTrackPath(videoPath) {
    var pathObject = path.parse(videoPath);
    return path.join(pathObject.dir, pathObject.name) + ".vtt";
}