import { Knex } from "knex";

exports.up = async function (knex: Knex) {
    await knex.schema.table("working-areas", (table) => {
        table.dropColumn("images");
    });
};

exports.down = async function (knex: Knex) {
    await knex.schema.table("working-areas", (table) => {
        table.specificType('images', 'VARCHAR[]');
    });
};
