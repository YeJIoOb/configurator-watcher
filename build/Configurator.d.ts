/// <reference types="node" />
import { IProvider } from './Provider';
export interface ICOnfiguratorOptions<P> {
    provider: P;
    interval?: number;
    parser?: IParser;
    haveToRegister?: boolean;
    intervalRegister?: number;
}
export interface IParser {
    [key: string]: (value: string, defaultValue?: any) => any;
}
export declare const DefaultTypeParser: {
    string: (value: string) => string;
    integer: (value: string, defaultValue?: number) => number;
    int: (value: string, defaultValue?: number) => number;
    float: (value: string, defaultValue?: number) => number;
    bool: (value: string, defaultValue?: boolean) => boolean;
};
export declare class Configurator<T extends IParser, P extends IProvider> {
    protected _config: ICOnfiguratorOptions<P>;
    protected _uInterval: NodeJS.Timer;
    protected _urInterval: NodeJS.Timer;
    config: Object;
    lastDateConfig: Date;
    protected parser: T;
    protected provider: P;
    constructor(_config: ICOnfiguratorOptions<P>);
    start(): Promise<void>;
    private updateConfigure;
    getConfigValue<Tk>(configName: string, type: keyof T, defaultValue?: Tk): Tk;
}
