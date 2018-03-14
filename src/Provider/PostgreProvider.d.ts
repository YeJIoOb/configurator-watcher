import { DatabasePool, DatabasePoolConfig } from 'back-js-postgres';
import { Provider } from './Provider';
export declare abstract class PostgreProvider extends Provider {
    db: DatabasePool;
    constructor(configure: DatabasePoolConfig | DatabasePool);
    abstract loadConfigure(): Object;
}
