// LICENSE : MIT
"use strict";
import UseCase from "../../framework/UseCase";
import {convertTrackAsync} from "../../../utils/track-util"
import LoadVideoAndTrackURL from "./LoadVideoAndTrackURL";
export default class LoadVideoFromFileURL extends UseCase {
    static create() {
        return new this();
    }

    execute(videoURL) {
        return convertTrackAsync(videoURL).then(trackURL => {
            const loadVideoAndTrackURL = new LoadVideoAndTrackURL();
            // TODO: Is this.context good?
            return this.context.useCase(loadVideoAndTrackURL).execute({
                videoURL,
                trackURL
            });
        });
    }
}