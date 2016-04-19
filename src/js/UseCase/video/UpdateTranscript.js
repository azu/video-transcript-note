// LICENSE : MIT
"use strict";
import UseCase from "../../framework/UseCase";
import videoRepository, {VideoRepository} from "../../infra/VideoRepository";
export default class UpdateTranscript extends UseCase {
    static create() {
        return new this({videoRepository});
    }

    /**
     * @param {VideoRepository} videoRepository
     */
    constructor({videoRepository}) {
        super();
        this.videoRepository = videoRepository;
    }

    /**
     * @param {string} text
     */
    execute(text) {
        const video = this.videoRepository.lastUsed();
        video.updateTranscript(text);
        this.videoRepository.save(video);
        // TODO: no dispatch
        this.dispatch({
            type: this.name,
            text
        })
    }
}