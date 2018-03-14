import { DatabasePool, DatabasePoolConfig, Database } from 'back-js-postgres';
import { Provider } from './Provider';

export abstract class PostgreProvider extends Provider {
    db: DatabasePool;
    constructor(configure: DatabasePoolConfig | DatabasePool) {
        super();
        if (configure instanceof DatabasePool) {
            this.db = configure
        } else {
            this.db = new DatabasePool(configure);
        }
    }
    abstract loadConfigure(): Object;
}