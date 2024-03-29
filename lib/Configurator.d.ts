/// <reference types="node" />
import { EventEmitter } from 'stream';
import { IParseFunc } from '.';
import { IParser } from './Parser';
import { IProvider } from './Provider';
export interface IConfiguratorOptions<O extends {
    [key: string]: any;
} = {
    [key: string]: any;
}, P extends IProvider<O> = IProvider<O>> {
    providers: P[];
    watchProviders?: boolean;
    watchInterval?: number;
    parser?: IParser;
}
export declare interface Configurator {
    on(event: 'error', listener: (err: any) => void): this;
}
export declare interface Configurator<O extends {
    [key: string]: any;
} = {
    [key: string]: any;
}, T extends IParser = IParser, P extends IProvider<O> = IProvider<O>> {
    getConfigValue<OKey extends keyof O = keyof O, OType = O[OKey], TKey extends keyof T = keyof T, TR extends IParseFunc<any> = IParser[keyof IParser], TRr = ReturnType<TR>, Tk = OType & TRr>(configName: OKey, type: TKey, defaultValue?: Tk): Tk;
    getConfigValue<Tk, OKey extends keyof O = keyof O, TKey extends keyof T = keyof T>(configName: OKey, type: TKey, defaultValue?: Tk): Tk;
}
export declare class Configurator<O extends {
    [key: string]: any;
} = {
    [key: string]: any;
}, T extends IParser = IParser, P extends IProvider<O> = IProvider<O>> extends EventEmitter {
    protected _config: IConfiguratorOptions<O, P>;
    protected _uInterval: NodeJS.Timer;
    config: O;
    lastDateConfig: Date;
    protected parser: T;
    protected providers: P[];
    constructor(_config: IConfiguratorOptions<O, P>);
    start(): Promise<void>;
    stopWatch(): void;
    private updateConfigure;
}
