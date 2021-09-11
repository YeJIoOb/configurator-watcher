import * as fs from 'fs';
import { Provider } from './Provider';

export interface IFileProviderOptions {
  path: string;
  encoding?: string;
}

export abstract class FileProvider<O extends { [key: string]: unknown }> extends Provider<O> {
  constructor(protected options: IFileProviderOptions) {
    super();
    fs.watchFile(options.path, () => this.updateConfigure());
  }
}
