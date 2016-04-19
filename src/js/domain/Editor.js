// LICENSE : MIT
"use strict";
const fs = require("fs");
const assert = require("assert");
const mkdirp = require("mkdirp");
const path = require("path");
const uuid = require("uuid");
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
    constructor({text, filePath, readonly} = {}) {
        this.id = uuid();
        this.text = text || "";
        this.filePath = filePath || null;
        this.readonly = readonly !== undefined ? readonly : false;
    }

    appendText(appendedText) {
        this.updateText(this.text + "\n" + appendedText);
    }

    updateText(text) {
        if (this.readonly) {
            throw new Error("editor is readonly. could not update.");
        }
        this.text = text;
    }

    /**
     * @param {boolean} isReadonly
     */
    setReadonlyState(isReadonly) {
        this.readonly = isReadonly;
    }

    loadFile(filePath) {
        return new Promise((resolve, reject) => {
            readFile(filePath, (error, data) => {
                if (error) {
                    return reject(error);
                }
                this.text = String(data);
                this.filePath = filePath;
                return resolve();
            });
        });
    }

    saveAsFile(filePath) {
        const text = this.text;
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, text, (error) => {
                if (error) {
                    return reject(error);
                }
                this.filePath = filePath;
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

    /**
     * @param {string} fileName
     * @param {string} dataURL
     * @returns {Promise}
     */
    saveImageAsFile({
        fileName,
        dataURL,
    }) {
        return new Promise((resolve, reject) => {
            assert(dataURL);
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
        return `![${formatVideoTime(currentTime)}](img/${fileName})
> ${quoteText}
`;
    }
}