import type { Knex } from "knex";

exports.up = async function (knex: Knex) {
  await knex.schema.createTable("user_tokens", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.uuid("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.string("token_hash").notNullable();
    table.string("type").notNullable();
    table.bigint("expires_at").notNullable();
    table.boolean("used").defaultTo(false);
    table.string("ip_address").notNullable();
    table.string("user_agent").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.index(["user_id"]);
    table.index(["type"]);
    table.index(["expires_at"]);
    table.index(["used"]);
    table.index(["user_id", "type"]);
  });
};

exports.down = async function (knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("user_tokens");
};
