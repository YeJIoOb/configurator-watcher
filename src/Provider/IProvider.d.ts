export interface IProvider {
    loadConfigure(): Object;
    setUpdateConfigure(func: () => void): void;
}
