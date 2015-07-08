// LICENSE : MIT
"use strict";
var fs = require('fs');
var srt2vtt = require('srt2vtt');
var srtData = fs.readFileSync("../videos/Kate Hudson - Beyond Responsive - Building a mobile web you're f_ing proud of _ JSConf US 2015-Y4ZTRztwLrg.en.srt");
srt2vtt(srtData, function (err, vttData) {
    if (err) {
        throw new Error(err);
    }
    fs.writeFileSync("../videos/Kate Hudson - Beyond Responsive - Building a mobile web you're f_ing proud of _ JSConf US 2015-Y4ZTRztwLrg.en.vtt", vttData);
});