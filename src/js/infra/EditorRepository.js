// LICENSE : MIT
"use strict";
const EventEmitter = require("events");
const fs = require("fs");
const REPOSITORY_CHANGE = "REPOSITORY_CHANGE";
import MemoryDB from "./adpter/MemoryDB";
import Editor from "../domain/Editor";
export class EditorRepository extends EventEmitter {
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
        // 本当はコンテキストを先頭に
        // Domain.<id>
        return this._database.get(`${Editor.name}.${id}`);
    }

    findById(id) {
        return this._get(id);
    }

    /**
     * @returns {Editor|undefined}
     */
    lastUsed() {
        const editor = this._database.get(`${Editor.name}.lastUsed`);
        if (!editor) {
            // restore from localStorage
            const restoreFilePath = localStorage.getItem("filePath");
            try {
                const text = fs.readFileSync(restoreFilePath, "utf-8");
                return new Editor({filePath: restoreFilePath, text});
            } catch (error) {
                return new Editor();
            }
        }
        return this._get(editor.id);
    }

    /**
     * @param {Editor} editor
     */
    save(editor) {
        this._database.set(`${Editor.name}.lastUsed`, editor);
        this._database.set(`${Editor.name}.${editor.id}`, editor);

        // save to local Storage
        if (editor.filePath) {
            localStorage.setItem("filePath", editor.filePath);
        } else {
            localStorage.removeItem("filePath");
        }
        this.emit(REPOSITORY_CHANGE);
    }

    /**
     * @param {Editor} editor
     */
    remove(editor) {
        this._database.delete(`${Editor.name}.${editor.id}`);
        this.emit(REPOSITORY_CHANGE);
    }

    onChange(handler) {
        this.on(REPOSITORY_CHANGE, handler);
    }
}
// singleton
export default new EditorRepository();