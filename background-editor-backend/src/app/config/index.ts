import dotenv from "dotenv";

dotenv.config();

export const config = {
  app: {
    name: process.env.APP_NAME || "background-editor-back",
    env: process.env.APP_ENV || "development",
    debug: process.env.APP_DEBUG === "true",
    port: parseInt(process.env.SERVER_PORT || "8080", 10),
  },
  jwt: {
    secret: process.env.JWT_SECRET || "-secret-key",
    expiration: process.env.JWT_EXPIRATION || "3600",
  },
  db: {
    connection: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
    database: process.env.POSTGRES_DB || "background-editor",
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
  },
  log: {
    level: process.env.LOG_LEVEL || "info",
  },
  db_log: {
    level: process.env.DB_LOG_LEVEL || "on",
  },
};
