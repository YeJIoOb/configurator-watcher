import { Optional } from "../interfaces";
export interface IProvider<O extends {
    [key: string]: unknown;
}> {
    loadConfigure(): Optional<O> | Promise<Optional<O>>;
    setUpdateConfigure(func: (...args: unknown[]) => void): void;
}
