import * as fs from 'fs';
import { IProviderOptions } from '.';
import { Provider } from './Provider';

export interface IFileProviderOptions extends IProviderOptions {
  path: string;
  watch?: boolean;
  encoding?: string;
}

export abstract class FileProvider<O extends { [key: string]: any }> extends Provider<O> {
  constructor(public options: IFileProviderOptions) {
    super(options);
    if (this.options.watch) {
      fs.watchFile(options.path, () => this.updateConfigure());
    }
  }
  stopWatch() {
    fs.unwatchFile(this.options.path);
  }
}
