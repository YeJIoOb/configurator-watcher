import { IProvider } from ".";
import { Optional } from "../interfaces";


export abstract class Provider<O extends { [key: string]: unknown }> implements IProvider<O> {
    updateConfigure: (...args: unknown[]) => void;
    abstract loadConfigure(): Optional<O> | Promise<Optional<O>>;
    setUpdateConfigure(update: (...args: unknown[]) => void) {
        this.updateConfigure = update;
    }
    registerConfigurator?(): void;
}