/// <reference types="node" />
import { EventEmitter } from 'stream';
import { IParser } from './Parser';
import { IProvider } from './Provider';
export interface IConfiguratorOptions<O extends {
    [key: string]: unknown;
} = {
    [key: string]: unknown;
}, P extends IProvider<O> = IProvider<O>> {
    providers: P[];
    watchProviders?: boolean;
    watchInterval?: number;
    parser?: IParser;
}
export declare interface Configurator {
    on(event: 'error', listener: (err: any) => void): this;
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
    getConfigValue<Tk>(configName: keyof O, type: keyof T, defaultValue?: Tk): Tk;
}
