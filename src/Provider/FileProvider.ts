import * as fs from 'fs';
import { Provider } from './Provider';

export interface IFileProviderOptions {
    path: string;
    encoding?: string;
}

export abstract class FileProvider extends Provider {
    constructor(protected options: IFileProviderOptions) {
        super();
        fs.watchFile(options.path, () => this.updateConfigure());
    }
}
