// LICENSE : MIT
"use strict";
import UseCase from "../../framework/UseCase";
import {convertTrackAsync} from "../../../utils/track-util"
export default class LoadVideoFromFileURL extends UseCase {
    static create() {
        return new this();
    }

    execute(videoURL) {
        return convertTrackAsync(videoURL).then(trackURL => {
            this.dispatch({
                type: this.name,
                trackURL
            })
        });
    }
}