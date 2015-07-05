// LICENSE : MIT
"use strict";
import { Store } from "material-flux"
import { keys } from "../actions/VideoAction"
var path = require("path");
export default class VideoStore extends Store {
    constructor(context) {
        super(context);
        this.state = {
            currentTranscript: ""
        };
        this.register(keys.updateTranscript, this.onUpdateTranscript);
    }

    getCurrentTranscript() {
        return this.state.currentTranscript;
    }

    onUpdateTranscript(text) {
        console.log(text);
        this.setState({
            currentTranscript: text
        });
    }
}