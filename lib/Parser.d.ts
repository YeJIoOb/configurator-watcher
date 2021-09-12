export declare type IParseFunc<T> = (value: unknown, defaultValue?: T) => T;
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
