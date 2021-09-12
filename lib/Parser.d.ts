export declare type IParseFunc<T> = (value: unknown, defaultValue?: T) => T;
export declare type IParser = {
    [string: string]: IParseFunc<any>;
};
export declare interface DefaultTypeParser {
    [key: string]: IParseFunc<any>;
}
export declare class DefaultTypeParser implements IParser {
    string(value: unknown): string;
    integer(value: unknown, defaultValue?: number): number;
    int(value: unknown, defaultValue?: number): number;
    float(value: unknown, defaultValue?: number): number;
    bool(value: unknown, defaultValue?: boolean): boolean;
    strArray(value: unknown): Array<string>;
    numArray(value: unknown): Array<number>;
    obj<T>(value: unknown): T;
}
