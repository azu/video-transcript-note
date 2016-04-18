// LICENSE : MIT
"use strict";
const fs = require("fs");
const path = require("path");
import {formatVideoTime} from "../../utils/time-formatter"
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
        this.filePath = "";
    }


    loadFile(filePath) {
        return new Promise((resolve, reject) => {
            readFile(filePath, (error, data) => {
                if (error) {
                    return reject(error);
                }
                const text = String(data);
                this.text = text;
                this.filePath = filePath;
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


    getSaveDir() {
        if (this.filePath == null) {
            return;
        }
        return path.dirname(this.filePath);
    }

    getSaveImageDir() {
        if (this.getSaveDir() == null) {
            return;
        }
        var imageDir = path.join(this.getSaveDir(), "img");
        mkdirp.sync(imageDir);
        return imageDir;
    }

    saveImageAsFile({
        fileName,
        dataURL,
    }) {
        return new Promise((resolve, reject) => {
            const saveImageDir = this.getSaveImageDir();
            if (!saveImageDir) {
                reject(new Error("Markdownを保存してください"));
            }
            // http://stackoverflow.com/questions/6926016/nodejs-saving-a-base64-encoded-image-to-disk
            const buffer = new Buffer(dataURL.replace(/^data:image\/png;base64,/, ""), 'base64');
            const imageFilePath = path.resolve(saveImageDir, fileName);
            fs.writeFile(imageFilePath, buffer, "base64", (error) => {
                if (error) {
                    return reject(error);
                }
                resolve(imageFilePath);
            });

        });
    }

    /**
     * create quote text from image file path and selection text
     * @param imageFilePath
     * @param currentTime
     * @param transcript
     * @returns {string}
     */
    createQuoteText({
        imageFilePath,
        currentTime,
        transcript
    }) {
        const quoteText = transcript.trim().split("\n").join("\n> ");
        const fileName = path.basename(imageFilePath);
        this.onQuote(
            `![${formatVideoTime(currentTime)}](img/${fileName})
> ${quoteText}
`);
    }
}