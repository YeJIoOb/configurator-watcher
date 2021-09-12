"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configurator = void 0;
const stream_1 = require("stream");
const Parser_1 = require("./Parser");
class Configurator extends stream_1.EventEmitter {
    constructor(_config) {
        super();
        this._config = _config;
        this.config = {};
        this.parser = (_config.parser || new Parser_1.DefaultTypeParser());
        this.providers = this._config.providers;
        for (const provider of this.providers) {
            provider.setUpdateConfigure(() => this.updateConfigure());
        }
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateConfigure();
            if (this._config.watchProviders) {
                this._uInterval = setInterval(() => {
                    this.updateConfigure();
                }, this._config.watchInterval || 5e3);
            }
        });
    }
    stopWatch() {
        clearInterval(this._uInterval);
        for (const provider of this.providers) {
            if (typeof provider.stopWatch === 'function') {
                provider.stopWatch();
            }
        }
    }
    updateConfigure() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newDataConfig = Object.assign({}, this.config);
                for (const provider of this.providers) {
                    try {
                        let dataConfig = provider.loadConfigure();
                        if (dataConfig instanceof Promise)
                            dataConfig = yield dataConfig;
                        Object.assign(newDataConfig, dataConfig);
                    }
                    catch (err) {
                        if (provider.options.throwOnError)
                            throw err;
                        if (typeof provider.options.handlerError === 'function')
                            provider.options.handlerError(err);
                    }
                }
                this.config = newDataConfig;
                this.lastDateConfig = new Date();
            }
            catch (err) {
                this.emit('error', err);
            }
        });
    }
    getConfigValue(configName, type, defaultValue) {
        return this.parser[String(type)](this.config[configName], defaultValue);
    }
}
exports.Configurator = Configurator;
