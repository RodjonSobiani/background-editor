import db from "./connection-kysely";
import { sql } from "kysely";
import { logger } from "../../shared/logger";

export const checkKyselyDbConnection = async () => {
  try {
    await sql<void>`SELECT 1`.execute(db);
    logger.info("[Kysely] Database connection successful");
  } catch (error) {
    logger.error({
      message: "[Kysely] Database connection failed",
      error: error instanceof Error ? error.message : error,
    });
    process.exit(1);
  }
};
