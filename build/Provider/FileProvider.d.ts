import { Provider } from './Provider';
export interface IFileProviderOptions {
    path: string;
    encoding?: string;
}
export declare abstract class FileProvider extends Provider {
    protected options: IFileProviderOptions;
    constructor(options: IFileProviderOptions);
}
