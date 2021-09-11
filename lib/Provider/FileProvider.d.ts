import { Provider } from './Provider';
export interface IFileProviderOptions {
    path: string;
    encoding?: string;
}
export declare abstract class FileProvider<O extends {
    [key: string]: unknown;
}> extends Provider<O> {
    protected options: IFileProviderOptions;
    constructor(options: IFileProviderOptions);
}
