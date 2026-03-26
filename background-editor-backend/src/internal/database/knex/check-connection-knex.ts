import db from "./connection-knex";
import { logger } from "../../shared/logger";

export const checkKnexDbConnection = async () => {
  try {
    await db.raw("SELECT 1");
    logger.info("[Knex] Database connection successful");
  } catch (error) {
    logger.error({
      message: "[Knex] Database connection failed",
      error: error instanceof Error ? error.message : error,
    });
    process.exit(1);
  }
};
