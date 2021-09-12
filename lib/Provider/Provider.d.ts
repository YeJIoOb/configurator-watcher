import { IProvider, IProviderOptions } from ".";
import { Optional } from "../interfaces";
export declare abstract class Provider<O extends {
    [key: string]: any;
}> implements IProvider<O> {
    options?: IProviderOptions;
    constructor(options?: IProviderOptions);
    updateConfigure: (...args: any[]) => void;
    abstract loadConfigure(): Optional<O> | Promise<Optional<O>>;
    setUpdateConfigure(update: (...args: any[]) => void): void;
    registerConfigurator?(): void;
    stopWatch?(): void;
}
