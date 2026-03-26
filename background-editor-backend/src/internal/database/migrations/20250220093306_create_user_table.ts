import { Knex } from "knex";

exports.up = async function (knex: Knex) {
  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("email").notNullable().unique();
    table.string("name");
    table.text("password_hash").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex: Knex) {
  await knex.schema.dropTableIfExists("users");
};
