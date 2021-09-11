import { EventEmitter } from 'stream';
import { Optional, OptionalKeysBool } from './interfaces';
import { IProvider } from './Provider'

export interface IConfiguratorOptions<O extends { [key: string]: unknown } = { [key: string]: unknown }, P extends IProvider<O> = IProvider<O>> {
  providers: P[];
  interval?: number;
  parser?: IParser;
}

type IParseFunc<T> = (value: unknown, defaultValue?: T) => T;

export interface IParser {
  string: IParseFunc<string>;
  integer: IParseFunc<number>;
  int: IParseFunc<number>;
  float: IParseFunc<number>;
  bool: IParseFunc<boolean>;
}

export class DefaultTypeParser implements IParser {
  string(value: unknown): string {
    if (typeof value === 'string') {
      return value;
    } else if (value instanceof Object) {
      return JSON.stringify(value);
    } else {
      return String(value);
    }
  }
  integer(value: unknown, defaultValue?: number) {
    if (isNaN(Number(value))) {
      return defaultValue;
    } else {
      let val = parseInt(String(value), 10);
      return val;
    }
  }
  int(value: unknown, defaultValue?: number): number {
    return this.integer(value, defaultValue);
  }
  float(value: unknown, defaultValue?: number): number {
    if (isNaN(Number(value))) {
      return defaultValue;
    } else {
      let val = parseFloat(String(value));
      return val;
    }
  }
  bool(value: unknown, defaultValue?: boolean): boolean {
    if (typeof value === 'undefined') {
      return defaultValue || false;
    }
    switch (String(value).toLowerCase()) {
      case 'true':
      case 'yes':
      case '1':
        return true;
      case 'false':
      case 'no':
      case '0':
        return false;
      default:
        throw new Error(`cannot cast "${value}" to boolean (${value})`);
    }
  }
}

export declare interface Configurator {
  on(event: 'error', listener: (err) => void): this;
}

export class Configurator<
  O extends { [key: string]: unknown } = { [key: string]: unknown },
  T extends IParser = IParser,
  P extends IProvider<O> = IProvider<O>
  > extends EventEmitter {
  protected _uInterval: NodeJS.Timer;
  public config: O = {} as O;
  public lastDateConfig: Date;
  protected parser: T;
  protected providers: P[];
  constructor(protected _config: IConfiguratorOptions<O, P>) {
    super();
    this.parser = <T>(_config.parser || new DefaultTypeParser());
    this.providers = this._config.providers;
    for (const provider of this.providers) {
      provider.setUpdateConfigure(() => this.updateConfigure());
    }
  }
  async start() {
    await this.updateConfigure();
    this._uInterval = setInterval(() => {
      this.updateConfigure()
    });
  }
  private async updateConfigure() {
    try {
      const newDataConfig: O = { ...this.config } as O;
      for (const provider of this.providers) {
        let dataConfig = provider.loadConfigure();
        if (dataConfig instanceof Promise) dataConfig = await dataConfig;
        Object.assign(newDataConfig, dataConfig);
      }
      this.config = newDataConfig;
      this.lastDateConfig = new Date();
    } catch (err) {
      this.emit('error', err);
    }
  }
  public getConfigValue<Tk>(configName: keyof O, type: keyof T, defaultValue?: Tk): Tk {
    return this.parser[String(type)](this.config[configName], defaultValue);
  }
}
