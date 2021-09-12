import { Optional } from "../interfaces";
export interface IProviderOptions {
    throwOnError?: boolean;
    handlerError?: (err: Error) => void;
}
export interface IProvider<O extends {
    [key: string]: any;
}> {
    options?: IProviderOptions;
    loadConfigure(): Optional<O> | Promise<Optional<O>>;
    setUpdateConfigure(func: (...args: unknown[]) => void): void;
    stopWatch?(): void;
}
