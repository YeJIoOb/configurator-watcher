import { IProvider } from ".";
export declare abstract class Provider implements IProvider {
    updateConfigure: () => void;
    abstract loadConfigure(): Object;
    setUpdateConfigure(update: any): void;
    registerConfigurator?(): void;
}
