"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const back_js_postgres_1 = require("back-js-postgres");
const Provider_1 = require("./Provider");
class PostgreProvider extends Provider_1.Provider {
    constructor(configure) {
        super();
        if (configure instanceof back_js_postgres_1.DatabasePool) {
            this.db = configure;
        }
        else {
            this.db = new back_js_postgres_1.DatabasePool(configure);
        }
    }
}
exports.PostgreProvider = PostgreProvider;
