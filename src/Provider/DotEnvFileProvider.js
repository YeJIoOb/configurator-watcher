"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileProvider_1 = require("./FileProvider");
const fs = require("fs");
// src from dotenv
function parse(src) {
    var obj = {};
    // convert Buffers before splitting into lines and processing
    src.toString().split('\n').forEach(function (line) {
        // matching "KEY' and 'VAL' in 'KEY=VAL'
        var keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
        // matched?
        if (keyValueArr != null) {
            var key = keyValueArr[1];
            // default undefined or missing values to empty string
            var value = keyValueArr[2] ? keyValueArr[2] : '';
            // expand newlines in quoted values
            var len = value ? value.length : 0;
            if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
                value = value.replace(/\\n/gm, '\n');
            }
            // remove any surrounding quotes and extra spaces
            value = value.replace(/(^['"]|['"]$)/g, '').trim();
            obj[key] = value;
        }
    });
    return obj;
}
class DotEnvFileProvider extends FileProvider_1.FileProvider {
    loadConfigure() {
        return new Promise((resolve, reject) => {
            // path src from dotenv
            var path = '.env';
            var encoding = 'utf8';
            const { options } = this;
            if (options) {
                if (options.path) {
                    path = options.path;
                }
                if (options.encoding) {
                    encoding = options.encoding;
                }
            }
            // specifying an encoding returns a string instead of a buffer
            fs.readFile(path, { encoding: encoding }, (err, data) => {
                if (err)
                    reject(err);
                try {
                    var parsedObj = parse(data);
                    resolve(parsedObj);
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
}
exports.DotEnvFileProvider = DotEnvFileProvider;
