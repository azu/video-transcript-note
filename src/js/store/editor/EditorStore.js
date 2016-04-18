// LICENSE : MIT
"use strict";
import mkdirp from "mkdirp"
import path from "path"
import fs from "fs";
import Store from "../../framework/Store"
import {formatVideoTime} from "../../../utils/time-formatter"
import EditorState from "./EditorState";
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

}