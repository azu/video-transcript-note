// LICENSE : MIT
"use strict";
const uuid = require("uuid");
export default class Video {
    constructor() {
        this.id = uuid();
        this.transcriptText = "";
    }

    /**
     * @param {string} text
     */
    updateTranscript(text){
        this.transcriptText = text;
    }
}
