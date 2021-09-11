"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessEnvProvider = void 0;
const Provider_1 = require("./Provider");
class ProcessEnvProvider extends Provider_1.Provider {
    loadConfigure() {
        return process.env;
    }
}
exports.ProcessEnvProvider = ProcessEnvProvider;
