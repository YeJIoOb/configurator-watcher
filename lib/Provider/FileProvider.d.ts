import { IProviderOptions } from '.';
import { Provider } from './Provider';
export interface IFileProviderOptions extends IProviderOptions {
    path: string;
    watch?: boolean;
    encoding?: string;
}
export declare abstract class FileProvider<O extends {
    [key: string]: any;
}> extends Provider<O> {
    options: IFileProviderOptions;
    constructor(options: IFileProviderOptions);
    stopWatch(): void;
}
