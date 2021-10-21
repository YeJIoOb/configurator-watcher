export interface IParser {
    string: IParseFunc<string>;
    integer: IParseFunc<number>;
    int: IParseFunc<number>;
    float: IParseFunc<number>;
    bool: IParseFunc<boolean>;
    strArray: IParseFunc<Array<string>>;
    numArray: IParseFunc<Array<number>>;
    obj: <T>(value: unknown, defaultValue?: T) => T;
}
export declare type IParseFunc<T> = (value: unknown, defaultValue?: T) => T;
export declare class DefaultTypeParser implements IParser {
    string(value: unknown, defaultValue?: string): string;
    integer(value: unknown, defaultValue?: number): number;
    int(value: unknown, defaultValue?: number): number;
    float(value: unknown, defaultValue?: number): number;
    bool(value: unknown, defaultValue?: boolean): boolean;
    strArray(value: unknown, defaultValue?: Array<string>): Array<string>;
    numArray(value: unknown, defaultValue?: Array<number>): Array<number>;
    obj<T>(value: unknown): T;
}
