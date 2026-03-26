import { config } from "../../../app/config";
import knex from "knex";

const db = knex({
  client: config.db.connection,
  connection: {
    host: config.db.host,
    port: config.db.port,
    database: config.db.database,
    user: config.db.username,
    password: config.db.password,
  },
});

export default db;
