

export interface IProvider {
  loadConfigure(): Object;
  registerConfigurator?(): void;
  setUpdateConfigure(func: () => void): void;
}
