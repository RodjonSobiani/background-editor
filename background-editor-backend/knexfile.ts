import { config } from "./src/app/config";

export default {
  client: config.db.connection,
  connection: {
    host: config.db.host,
    port: config.db.port,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
  },
  migrations: {
    directory: "./src/internal/database/migrations",
  },
  seeds: {
    directory: "./src/internal/database/seeds",
  },
};
