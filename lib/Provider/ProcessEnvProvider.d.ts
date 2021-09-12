import { Optional } from '../interfaces';
import { Provider } from './Provider';
export interface IProcessEnvProviderOptions {
}
export declare class ProcessEnvProvider<O extends {
    [key: string]: any;
}> extends Provider<O> {
    loadConfigure(): Optional<O>;
}
