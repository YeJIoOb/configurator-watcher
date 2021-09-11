export declare type Optional<T> = {
    [K in keyof T]?: T[K];
}[keyof T];
export declare type OptionalKeysBool<T> = {
    [K in keyof T]?: boolean;
}[keyof T];
