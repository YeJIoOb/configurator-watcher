import { IProvider } from './Provider'

export interface ICOnfiguratorOptions<P> {
    provider: P;
    interval?: number;
    parser?: IParser;
    haveToRegister?: boolean;
    intervalRegister?: number;
}

export interface IParser {
    [key: string]: (value: string, defaultValue?: any) => any;
}

export const DefaultTypeParser = {
    string: (value: string): string => value,
    integer: (value: string, defaultValue?: number): number => {
        let val = parseInt(value, 10);
        return !isNaN(val) ? val : defaultValue;
    },
    int: (value: string, defaultValue?: number): number => {
        return DefaultTypeParser.integer(value, defaultValue);
    },
    float: (value: string, defaultValue?: number): number => {
        let val = parseFloat(value);
        return !isNaN(val) ? val : defaultValue;
    },
    bool: (value: string, defaultValue?: boolean): boolean => {
        if (typeof value === 'undefined') {
            return defaultValue || false;
        }
        switch (value.toLowerCase()) {
            case 'true':
            case 'yes':
            case '1':
                return true;
            case 'false':
            case 'no':
            case '0':
                return false;
            default:
                throw new Error(`cannot cast "${value}" to boolean (${name})`);
        }
    }
}

export class Configurator<T extends IParser, P extends IProvider> {
    protected _uInterval: NodeJS.Timer;
    protected _urInterval: NodeJS.Timer;
    public config: Object;
    public lastDateConfig: Date;
    protected parser: T;
    protected provider: P;
    constructor(protected _config: ICOnfiguratorOptions<P>) {
        this.parser = <T>(_config.parser || DefaultTypeParser);
        this.provider = this._config.provider;
        this.provider.setUpdateConfigure(() => this.updateConfigure());
    }
    async start() {
        await this.updateConfigure();
        this._uInterval = setInterval(() => this.updateConfigure(), this._config.interval || 5e3);
        if (
            typeof this.provider.registerConfigurator === 'function' &&
            this._config.haveToRegister &&
            typeof this._config.intervalRegister !== 'undefined'
        ) {
            this._urInterval = setInterval(() => this.provider.registerConfigurator(), this._config.intervalRegister || 5e3);
        }
    }
    private async updateConfigure() {
        let dataConfig: Object = this.provider.loadConfigure();
        if (dataConfig instanceof Promise) dataConfig = await dataConfig;
        this.config = dataConfig;
        this.lastDateConfig = new Date();
    }
    public getConfigValue<Tk>(configName: string, type: keyof T, defaultValue?: Tk): Tk {
        return this.parser[type](this.config[configName], defaultValue);
    }
}
