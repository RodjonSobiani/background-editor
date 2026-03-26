import { checkKnexDbConnection } from "./knex/check-connection-knex";
import { checkKyselyDbConnection } from "./kysely/check-connection-kysely";

export const checkDbConnections = async () => {
  try {
    await checkKnexDbConnection();
    await checkKyselyDbConnection();
  } catch (error) {
    console.error("[DB] Database connection check failed:", error);
    process.exit(1);
  }
};
