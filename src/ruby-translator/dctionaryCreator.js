"use strict";
var results = {};
var dict = require("kantan-ej-dict");
var enKeys = Object.keys(dict);
var SVL_Level = 1;

function isIgnoreWord(word) {
    if (/^=/.test(word)) {
        return true;
    }
    return false;
}
// svl_levelを4以上のみにする
function limitSVLLevel(object) {
    return object["svl_level"] >= SVL_Level;
}

function rebuildDict() {
    results = {};
    enKeys.forEach(function (key) {
        var object = dict[key];
        if (!limitSVLLevel(object)) {
            return;
        }
        var jaWords = dict[key].ja.filter(function (jaWord) {
            return !isIgnoreWord(jaWord);
        });
        if (jaWords.length > 0) {
            results[key] = jaWords;
        }
    });
    return results;
}
rebuildDict();
export default function dict(level = SVL_Level) {
    if (level !== SVL_Level) {
        SVL_Level = level;
        return rebuildDict();
    }
    return results;
}