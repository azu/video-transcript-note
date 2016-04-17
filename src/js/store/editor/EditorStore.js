// LICENSE : MIT
"use strict";
import mkdirp from "mkdirp"
import path from "path"
import fs from "fs";
import Store from "../../framework/Store"
import {formatVideoTime} from "../../../utils/time-formatter"
import EditorState from "./EditorState";
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
export default class EditorStore extends Store {
    constructor() {
        super();
        const filePath = localStorage.getItem("filePath");
        // initial load
        // this.onOpenFile(filePath);

        this.state = new EditorState({filePath});
        // auto save per 5s
        // setInterval(this._onAutoSave.bind(this), 5000);
        // save filePath persistent
        this.onChange(() => {
            if (this.state.readonly) {
                return;
            }
            if (this.state.filePath) {
                localStorage.setItem("filePath", this.state.filePath);
            } else {
                localStorage.removeItem("filePath");
            }
        });

        this.onDispatch(this.setState);
    }

    /**
     * @param {DispatcherPayload} payload
     */
    setState(payload) {
        const newState = this.state.reduce(payload);
        if(this.state !== newState) {
            this.state = newState;
            this.emitChange();
        }
    };

    getState() {
        return this.state;
    }

    _onAutoSave() {
        // disable when readonly mode
        if (this.state.readonly) {
            return;
        }
        if (this.state.filePath == null || this.state.text.length === 0) {
            return;
        }
        fs.writeFile(this.state.filePath, this.state.text, (error) => {
            var appName = require("../../package.json").name;
            if (error) {
                console.error(error);
                new Notification(appName, {
                    body: `Fail saving ${this.state.filePath}`
                });
            }
        });
    }

    getSaveDir() {
        if (this.state.filePath == null) {
            return;
        }
        return path.dirname(this.state.filePath);
    }

    getSaveImageDir() {
        if (this.getSaveDir() == null) {
            return;
        }
        var imageDir = path.join(this.getSaveDir(), "img");
        mkdirp.sync(imageDir);
        return imageDir;
    }

    getFilePath() {
        return this.state.filePath;
    }
    
    onSaveImage({fileName, dataURL, currentTime, transcript}) {
        if (this.getSaveImageDir() == null) {
            console.error("先にMarkdownを保存してください");
            return;
        }
        // http://stackoverflow.com/questions/6926016/nodejs-saving-a-base64-encoded-image-to-disk
        var buffer = new Buffer(dataURL.replace(/^data:image\/png;base64,/, ""), 'base64');
        var filePath = path.resolve(this.getSaveImageDir(), fileName);
        fs.writeFile(filePath, buffer, "base64", (error) => {
            var appName = require("../../package.json").name;
            if (error) {
                console.error(error);
                new Notification(appName, {
                    body: `Fail saving image: ${fileName}`
                });
                return;
            }
            var quoteText = transcript.trim().split("\n").join("\n> ");
            this.onQuote(
                `![${formatVideoTime(currentTime)}](img/${fileName})
> ${quoteText}
`);
        });
    }
}