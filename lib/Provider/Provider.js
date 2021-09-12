"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
class Provider {
    constructor(options) {
        this.options = options;
        if (!this.options) {
            this.options = {};
        }
    }
    setUpdateConfigure(update) {
        this.updateConfigure = update;
    }
}
exports.Provider = Provider;
