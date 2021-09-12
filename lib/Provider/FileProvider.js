"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileProvider = void 0;
const fs = require("fs");
const Provider_1 = require("./Provider");
class FileProvider extends Provider_1.Provider {
    constructor(options) {
        super(options);
        this.options = options;
        if (this.options.watch) {
            fs.watchFile(options.path, () => this.updateConfigure());
        }
    }
    stopWatch() {
        fs.unwatchFile(this.options.path);
    }
}
exports.FileProvider = FileProvider;
