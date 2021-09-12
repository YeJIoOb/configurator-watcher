import { IProvider, IProviderOptions } from ".";
import { Optional } from "../interfaces";

export abstract class Provider<O extends { [key: string]: any }> implements IProvider<O> {
  constructor(public options?: IProviderOptions) {
    if (!this.options) {
      this.options = {};
    }
  }
  updateConfigure: (...args: any[]) => void;
  abstract loadConfigure(): Optional<O> | Promise<Optional<O>>;
  setUpdateConfigure(update: (...args: any[]) => void) {
    this.updateConfigure = update;
  }
  registerConfigurator?(): void;
  stopWatch?(): void;
}