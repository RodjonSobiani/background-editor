import { Knex } from "knex";

exports.up = async function (knex: Knex) {
  await knex.schema.createTable("questions", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.text("question").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex: Knex) {
  await knex.schema.dropTableIfExists("questions");
};
