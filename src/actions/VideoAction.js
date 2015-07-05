// LICENSE : MIT
"use strict";
import { Action } from "material-flux"
export var keys = {
    updateTranscript: Symbol("updateTranscript")
};
export default class VideoAction extends Action {
    updateTranscript(text) {
        this.dispatch(keys.updateTranscript, text);
    }
}