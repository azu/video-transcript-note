// LICENSE : MIT
"use strict";
const EventEmitter = require("events");
const REPOSITORY_CHANGE = "REPOSITORY_CHANGE";
import MemoryDB from "./adpter/MemoryDB";
import Video from "../domain/Video";
export class VideoRepository extends EventEmitter {
    constructor(database = new MemoryDB()) {
        super();
        /**
         * @type {MemoryDB}
         */
        this._database = database;
    }

    /**
     * get instance
     * @param id
     * @private
     */
    _get(id) {
        // Domain.<id>
        return this._database.get(`${Video.name}.${id}`);
    }

    findById(id) {
        return this._get(id);
    }

    /**
     * @returns {Video|undefined}
     */
    lastUsed() {
        console.log(`${Video.name}.lastUsed`);
        const video = this._database.get(`${Video.name}.lastUsed`);
        if (!video) {
            return new Video();
        }
        return this._get(video.id);
    }

    /**
     * @param {Video} video
     */
    save(video) {
        this._database.set(`${Video.name}.lastUsed`, video);
        this._database.set(`${Video.name}.${video.id}`, video);
        this.emit(REPOSITORY_CHANGE);
    }

    /**
     * @param {Video} video
     */
    remove(video) {
        this._database.delete(`${Video.name}.${video.id}`);
        this.emit(REPOSITORY_CHANGE);
    }

    onChange(handler) {
        this.on(REPOSITORY_CHANGE, handler);
    }
}
// singleton
export default new VideoRepository();