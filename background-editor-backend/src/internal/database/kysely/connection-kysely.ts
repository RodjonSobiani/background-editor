import { Kysely, PostgresDialect } from "kysely";
import { Pool, types } from "pg";
import { logger } from "../../shared/logger";
import { Database } from "../models";
import { config } from "../../../app/config";

// Настройка диалекта для подключения к Postgres
const SqlDialectConfig = new PostgresDialect({
  pool: new Pool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
  }),
});

const db = new Kysely<Database>({
  dialect: SqlDialectConfig,
  log(event) {
    if (process.env.DB_LOGGER_LEVEL === "debug" && event.level === "query") {
      logger.debug(
        {
          durationMs: `${event.queryDurationMillis.toFixed(2)} ms`,
          sql: event.query.sql,
        },
        "[SQL]",
      );
    }

    if (
      (process.env.DB_LOGGER_LEVEL === "error" ||
        process.env.DB_LOGGER_LEVEL === "debug") &&
      event.level === "error"
    ) {
      logger.error(
        {
          ...event,
        },
        "[SQL Error]",
      );
    }
  },
});

types.setTypeParser(types.builtins.INT8, (val: string) => {
  if (val !== undefined && val !== null) {
    return Number(BigInt(val));
  }
  return val;
});

export default db;
