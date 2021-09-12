import { FileProvider } from "./FileProvider";
import { Optional } from "../interfaces";
export declare class DotEnvFileProvider<O extends {
    [key: string]: any;
} = {
    [key: string]: any;
}> extends FileProvider<O> {
    loadConfigure(): Promise<Optional<O>>;
}
