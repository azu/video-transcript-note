// LICENSE : MIT
"use strict";
const fs = require("fs");
function readFile(filePath, callback) {
    var urlReg = /(^https?:|^file:)/;
    if (urlReg.test(filePath) || typeof fs.readFile === "undefined") {
        var req = new XMLHttpRequest();
        req.open("GET", filePath, true);
        req.onload = function () {
            callback(null, req.responseText);
        };
        req.onerror = function () {
            callback(new Error(req.statusText));
        };
        req.send();
    } else {
        fs.readFile(filePath, callback);
    }
}

export default class Editor {
    constructor() {
        this.text = "";
    }

    loadFile(filePath) {
        return new Promise((resolve, reject) => {
            readFile(filePath, (error, data) => {
                if (error) {
                    return reject(error);
                }
                const text = String(data);
                this.text = text;
                return resolve(text);
            });
        });
    }

    saveAsFile(filePath, text) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, text, (error) => {
                if (error) {
                    return reject(error);
                }
                resolve();
            });
        });

    }
}