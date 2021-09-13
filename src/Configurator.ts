import { EventEmitter } from 'stream';
import { IParseFunc } from '.';
import { DefaultTypeParser, IParser } from './Parser';
import { IProvider } from './Provider'

export interface IConfiguratorOptions<O extends { [key: string]: any } = { [key: string]: any }, P extends IProvider<O> = IProvider<O>> {
  providers: P[];
  watchProviders?: boolean;
  watchInterval?: number;
  parser?: IParser;
}

export declare interface Configurator {
  on(event: 'error', listener: (err) => void): this;
}

export declare interface Configurator<
  O extends { [key: string]: any } = { [key: string]: any },
  T extends IParser = IParser,
  P extends IProvider<O> = IProvider<O>
  > {
  getConfigValue<
    OKey extends keyof O = keyof O,
    OType = O[OKey],
    TKey extends keyof T = keyof T,
    TR extends IParseFunc<any> = IParser[keyof IParser],
    TRr = ReturnType<TR>,
    Tk = OType & TRr
  >(configName: OKey, type: TKey, defaultValue?: Tk): Tk;
  getConfigValue<
    Tk,
    OKey extends keyof O = keyof O,
    TKey extends keyof T = keyof T
  >(configName: OKey, type: TKey, defaultValue?: Tk): Tk;
}

export class Configurator<
  O extends { [key: string]: any } = { [key: string]: any },
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
    this.parser = <T>(_config.parser || new DefaultTypeParser() as any);
    this.providers = this._config.providers;
    for (const provider of this.providers) {
      provider.setUpdateConfigure(() => this.updateConfigure());
    }
  }

  async start() {
    await this.updateConfigure();
    if (this._config.watchProviders) {
      this._uInterval = setInterval(() => {
        this.updateConfigure()
      }, this._config.watchInterval || 5e3);
    }
  }

  stopWatch() {
    clearInterval(this._uInterval);
    for (const provider of this.providers) {
      if (typeof provider.stopWatch === 'function') {
        provider.stopWatch();
      }
    }
  }

  private async updateConfigure() {
    try {
      const newDataConfig: O = { ...this.config } as O;
      for (const provider of this.providers) {
        try {
          let dataConfig = provider.loadConfigure();
          if (dataConfig instanceof Promise) dataConfig = await dataConfig;
          Object.assign(newDataConfig, dataConfig);
        } catch (err) {
          if (provider.options.throwOnError)
            throw err;
          if (typeof provider.options.handlerError === 'function')
            provider.options.handlerError(err);
        }
      }
      this.config = newDataConfig;
      this.lastDateConfig = new Date();
    } catch (err) {
      this.emit('error', err);
    }
  }

  public getConfigValue<
    OKey extends keyof O = keyof O,
    OType = O[OKey],
    TKey extends keyof T = keyof IParser,
    TR extends IParseFunc<any> = IParser[keyof IParser],
    TRr = ReturnType<TR>,
    Tk = OType & TRr
  >(configName: OKey, type: TKey, defaultValue?: Tk): Tk {
    return this.parser[String(type)](this.config[configName], defaultValue);
  }
}
