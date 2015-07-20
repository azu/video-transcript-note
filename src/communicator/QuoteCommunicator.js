"use strict";
import {EventEmitter} from "events";
export default class QuoteCommunicator extends EventEmitter {
    quoteImage(callback) {
        this.once("quote", callback);
        this.emit("before:quote", (dataURL, currentTime) => {
            this.emit("quote", dataURL, currentTime);
        });
    }

    /*
        onQuoteImageRequest(function(done){
           var dataURL = "...";
           done(dataURL);
        })
     */
    onQuoteImageRequest(callback) {
        this.on("before:quote", callback);
    }

}