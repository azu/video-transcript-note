// LICENSE : MIT
"use strict";
import {Context} from 'material-flux';
import EditorAction from "./actions/EditorAction"
import EditorStore from "./stores/EditorStore"
import VideoAction from "./actions/VideoAction"
import VideoStore from "./stores/VideoStore"

export default class MainContext extends Context {
    constructor() {
        super();
        this.editorAction = new EditorAction(this);
        this.editorStore = new EditorStore(this);
        this.videoAction = new VideoAction(this);
        this.videoStore = new VideoStore(this);
    }

}