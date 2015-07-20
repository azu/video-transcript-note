// LICENSE : MIT
"use strict";
var markdownExtensions = require('markdown-extensions');
var remote = require('remote');
var dialog = remote.require("dialog");
export default class FileUtils {
    static openSaveAs(saveAsFile) {
        var options = {
            title: 'Save Markdown file',
            filters: [
                {name: 'Markdown', extensions: markdownExtensions}
            ]
        };
        dialog.showSaveDialog(null, options, function (filePath) {
            if(filePath) {
                saveAsFile(filePath);
            }
        });
    }

    static openFile(openAsFile) {
        var options = {
            title: 'Open Markdown file',
            filters: [
                {name: 'Markdown', extensions: markdownExtensions}
            ]
        };
        dialog.showOpenDialog(null, options, function(filePath){
            if(filePath) {
                openAsFile(filePath);
            }
        });
    }
}