import { FileProvider } from "./FileProvider";
import * as fs from 'fs';
import { Optional } from "../interfaces";

// src from dotenv
function parse<T>(src: Buffer): T {
  var obj: T = {} as T;
  // convert Buffers before splitting into lines and processing
  src.toString().split('\n').forEach(function (line) {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    var keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/)
    // matched?
    if (keyValueArr != null) {
      var key = keyValueArr[1]

      // default undefined or missing values to empty string
      var value = keyValueArr[2] ? keyValueArr[2] : ''

      // expand newlines in quoted values
      var len = value ? value.length : 0
      if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
        value = value.replace(/\\n/gm, '\n')
      }
      // remove any surrounding quotes and extra spaces
      value = value.replace(/(^['"]|['"]$)/g, '').trim()
      obj[key] = value
    }
  })

  return obj
}

export class DotEnvFileProvider<O extends { [key: string]: any } = { [key: string]: any }> extends FileProvider<O> {
  loadConfigure(): Promise<Optional<O>> {
    return new Promise((resolve, reject) => {
      // path src from dotenv
      let path = '.env'
      let encoding = 'utf8'
      const { options } = this;

      if (options) {
        if (options.path) {
          path = options.path
        }
        if (options.encoding) {
          encoding = options.encoding
        }
      }

      // specifying an encoding returns a string instead of a buffer
      fs.readFile(path, { encoding: (encoding as null) }, (err, data) => {
        if (err) reject(err);
        try {
          var parsedObj: Optional<O> = parse<Optional<O>>(data)
          resolve(parsedObj)
        } catch (e) {
          reject(e);
        }
      })
    });
  }
}