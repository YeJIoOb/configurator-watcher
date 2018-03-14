import { IProvider } from ".";


export abstract class Provider implements IProvider {
    updateConfigure: () => void;
    abstract loadConfigure(): Object;
    setUpdateConfigure(update) {
        this.updateConfigure = update;
    }
}