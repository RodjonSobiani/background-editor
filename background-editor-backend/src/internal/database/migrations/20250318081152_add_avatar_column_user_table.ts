import { Knex } from "knex";

exports.up = async function (knex: Knex) {
  await knex.schema.table("users", (table) => {
    table.string("avatar");
  });
};

exports.down = async function (knex: Knex) {
  await knex.schema.table("users", (table) => {
    table.dropColumn("avatar");
  });
};
