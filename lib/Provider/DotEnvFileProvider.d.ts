import { FileProvider } from "./FileProvider";
import { Optional } from "../interfaces";
export declare class DotEnvFileProvider<O extends {
    [key: string]: unknown;
} = {
    [key: string]: unknown;
}> extends FileProvider<O> {
    loadConfigure(): Promise<Optional<O>>;
}
