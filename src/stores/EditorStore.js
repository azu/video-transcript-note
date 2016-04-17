// LICENSE : MIT
"use strict";
import {Store} from "material-flux"
import {keys} from "../actions/EditorAction"
import {formatVideoTime} from "../utils/time-formatter"
import mkdirp from "mkdirp"
import path from "path"
import fs from "fs";
import EditorState from "./editor/EditorState";
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
    constructor(context) {
        super(context);
        this.state = new EditorState();
        this.register(keys.quote, this.onQuote);
        this.register(keys.createNewFile, this.onCreateNewFile);
        this.register(keys.save, this.onSave);
        this.register(keys.saveAsFile, this.onSaveAsFile);
        this.register(keys.saveImage, this.onSaveImage);
        this.register(keys.openFile, this.onOpenFile);
        this.register(keys.readonly, this.onReadonly);


        // initial load
        var filePath = localStorage.getItem("filePath");
        this.onOpenFile(filePath);
        // auto save per 5s
        setInterval(this._onAutoSave.bind(this), 5000);
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
    }

    /**
     * @param {DispatcherPayload} payload
     */
    setState(payload) {
        this.state = this.state.reduce(payload);
        this.emit("change");
    };

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

    getText() {
        return this.state.text;
    }

    getQuoteText() {
        return this.state.quoteText;
    }

    isReadonly() {
        return this.state.readonly;
    }

    onCreateNewFile() {
        this.setState({
            type: "onCreateNewFile"
        });
    }

    onOpenFile(filePath) {
        if (filePath == null) {
            return;
        }
        var appName = require("../../package.json").name;
        readFile(filePath, (error, data) => {
            if (error) {
                console.error(error.stack);
                new Notification(appName, {
                    body: `Fail opening ${filePath}`
                });
                return;
            }
            this.setState({
                type: "onOpenFile",
                text: String(data),
                filePath: filePath
            });
        });
    }

    onSaveAsFile(filePath) {
        if (this.state.readonly) {
            return;
        }
        fs.writeFile(filePath, this.state.text, (error) => {
            var appName = require("../../package.json").name;
            if (error) {
                console.error(error);
                new Notification(appName, {
                    body: `Fail saving ${filePath}`
                });
                return;
            }
            this.setState({
                type: "onSaveAsFile",
                filePath: filePath
            });
        });
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

    onSave(text) {
        if (text === this.state.text) {
            return;
        }
        this.setState({
            type: "onSave",
            text: text
        });
    }

    onQuote(text) {
        if (text === this.state.quoteText) {
            return;
        }
        this.setState({
            type: "onQuote",
            quoteText: text
        });

        this.emit("quote", text);
    }

    onReadonly(isReadonly) {
        if (typeof isReadonly === "undefined") {
            return;
        }
        this.setState({
            type: "onReadonly",
            readonly: isReadonly
        });
    }
}