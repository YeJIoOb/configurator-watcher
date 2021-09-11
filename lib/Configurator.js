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
exports.Configurator = exports.DefaultTypeParser = void 0;
const stream_1 = require("stream");
class DefaultTypeParser {
    string(value) {
        if (typeof value === 'string') {
            return value;
        }
        else if (value instanceof Object) {
            return JSON.stringify(value);
        }
        else {
            return String(value);
        }
    }
    integer(value, defaultValue) {
        if (isNaN(Number(value))) {
            return defaultValue;
        }
        else {
            let val = parseInt(String(value), 10);
            return val;
        }
    }
    int(value, defaultValue) {
        return this.integer(value, defaultValue);
    }
    float(value, defaultValue) {
        if (isNaN(Number(value))) {
            return defaultValue;
        }
        else {
            let val = parseFloat(String(value));
            return val;
        }
    }
    bool(value, defaultValue) {
        if (typeof value === 'undefined') {
            return defaultValue || false;
        }
        switch (String(value).toLowerCase()) {
            case 'true':
            case 'yes':
            case '1':
                return true;
            case 'false':
            case 'no':
            case '0':
                return false;
            default:
                throw new Error(`cannot cast "${value}" to boolean (${value})`);
        }
    }
}
exports.DefaultTypeParser = DefaultTypeParser;
class Configurator extends stream_1.EventEmitter {
    constructor(_config) {
        super();
        this._config = _config;
        this.config = {};
        this.parser = (_config.parser || new DefaultTypeParser());
        this.providers = this._config.providers;
        for (const provider of this.providers) {
            provider.setUpdateConfigure(() => this.updateConfigure());
        }
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateConfigure();
            this._uInterval = setInterval(() => {
                this.updateConfigure();
            });
        });
    }
    updateConfigure() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newDataConfig = Object.assign({}, this.config);
                for (const provider of this.providers) {
                    let dataConfig = provider.loadConfigure();
                    if (dataConfig instanceof Promise)
                        dataConfig = yield dataConfig;
                    Object.assign(newDataConfig, dataConfig);
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
