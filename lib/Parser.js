"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTypeParser = void 0;
class DefaultTypeParser {
    string(value) {
        if (typeof value === 'string') {
            return value;
            ``;
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
    strArray(value) {
        if (value instanceof Array) {
            return value;
        }
        else if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            }
            catch (err) {
                if (value.includes(',')) {
                    return value.split(',');
                }
            }
        }
    }
    numArray(value) {
        if (value instanceof Array) {
            return value;
        }
        else if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            }
            catch (err) {
                if (value.includes(',')) {
                    return value.split(',').map(a => Number(a));
                }
            }
        }
    }
    obj(value) {
        try {
            return JSON.parse(value);
        }
        catch (err) {
            return {};
        }
    }
}
exports.DefaultTypeParser = DefaultTypeParser;
