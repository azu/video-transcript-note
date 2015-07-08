"use strict";
import {EventEmitter} from "events";
export default class QuoteCommunicator extends EventEmitter {
    quoteImage(callback) {
        this.once("quote", callback);
        this.emit("before:quote", (dataURL) => {
            this.emit("quote", dataURL);
        });
    }

    onQuoteImageRequest(callback) {
        this.on("before:quote", callback);
    }

}