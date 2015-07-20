// LICENSE : MIT
"use strict";
var remote = require('remote');
var dialog = remote.require("dialog");
export default class FileUtils {
    static openSaveAs(saveAsFile) {
        var options = {
            title: 'Save Markdown file',
            filters: [
                {name: 'Markdown', extensions: ['md', 'mdk', 'markdown']}
            ]
        };
        dialog.showSaveDialog(null, options, function (filePath) {
            saveAsFile(filePath);
        });
    }

    static openFile(openAsFile) {
        var options = {
            title: 'Open Markdown file',
            filters: [
                {name: 'Markdown', extensions: ['md', 'mdk', 'markdown']}
            ]
        };
        dialog.showOpenDialog(null, options, function(filePath){
            openAsFile(filePath);
        });
    }
}