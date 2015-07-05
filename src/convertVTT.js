// LICENSE : MIT
"use strict";
var fs = require('fs');
var srt2vtt = require('srt2vtt');
var srtData = fs.readFileSync('en.srt');
srt2vtt(srtData, function (err, vttData) {
    if (err) {
        throw new Error(err);
    }
    fs.writeFileSync('en.vtt', vttData);
});