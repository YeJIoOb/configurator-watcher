/// <reference types="node" />
import { EventEmitter } from 'stream';
import { IProvider } from './Provider';
export interface IConfiguratorOptions<O extends {
    [key: string]: unknown;
} = {
    [key: string]: unknown;
}, P extends IProvider<O> = IProvider<O>> {
    providers: P[];
    interval?: number;
    parser?: IParser;
}
declare type IParseFunc<T> = (value: unknown, defaultValue?: T) => T;
export interface IParser {
    string: IParseFunc<string>;
    integer: IParseFunc<number>;
    int: IParseFunc<number>;
    float: IParseFunc<number>;
    bool: IParseFunc<boolean>;
}
export declare class DefaultTypeParser implements IParser {
    string(value: unknown): string;
    integer(value: unknown, defaultValue?: number): number;
    int(value: unknown, defaultValue?: number): number;
    float(value: unknown, defaultValue?: number): number;
    bool(value: unknown, defaultValue?: boolean): boolean;
}
export declare interface Configurator {
    on(event: 'error', listener: (err: any) => void): this;
}
export declare class Configurator<O extends {
    [key: string]: unknown;
} = {
    [key: string]: unknown;
}, T extends IParser = IParser, P extends IProvider<O> = IProvider<O>> extends EventEmitter {
    protected _config: IConfiguratorOptions<O, P>;
    protected _uInterval: NodeJS.Timer;
    config: O;
    lastDateConfig: Date;
    protected parser: T;
    protected providers: P[];
    constructor(_config: IConfiguratorOptions<O, P>);
    start(): Promise<void>;
    private updateConfigure;
    getConfigValue<Tk>(configName: keyof O, type: keyof T, defaultValue?: Tk): Tk;
}
export {};
