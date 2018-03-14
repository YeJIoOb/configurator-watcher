"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTypeParser = {
    string: (value) => value,
    integer: (value, defaultValue) => {
        let val = parseInt(value, 10);
        return !isNaN(val) ? val : defaultValue;
    },
    int: (value, defaultValue) => {
        return exports.DefaultTypeParser.integer(value, defaultValue);
    },
    float: (value, defaultValue) => {
        let val = parseFloat(value);
        return !isNaN(val) ? val : defaultValue;
    },
    bool: (value, defaultValue) => {
        if (typeof value === 'undefined') {
            return defaultValue || false;
        }
        switch (value.toLowerCase()) {
            case 'true':
            case 'yes':
            case '1':
                return true;
            case 'false':
            case 'no':
            case '0':
                return false;
            default:
                throw new Error(`cannot cast "${value}" to boolean (${name})`);
        }
    }
};
class Configurator {
    constructor(_config) {
        this._config = _config;
        this.parser = (_config.parser || exports.DefaultTypeParser);
        this.provider = this._config.provider;
        this.provider.setUpdateConfigure(() => this.updateConfigure());
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateConfigure();
            this._uInterval = setInterval(() => this.updateConfigure(), this._config.interval || 5e3);
        });
    }
    updateConfigure() {
        return __awaiter(this, void 0, void 0, function* () {
            let dataConfig = this.provider.loadConfigure();
            if (dataConfig instanceof Promise)
                dataConfig = yield dataConfig;
            this.config = dataConfig;
            this.lastDateConfig = new Date();
        });
    }
    getConfigValue(configName, type, defaultValue) {
        return this.parser[type](this.config[configName], defaultValue);
    }
}
exports.Configurator = Configurator;
