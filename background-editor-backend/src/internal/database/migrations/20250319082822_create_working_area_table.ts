import {Knex} from "knex";

exports.up = async function (knex: Knex) {
    await knex.schema.createTable("working-areas", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.specificType('images', 'VARCHAR[]');
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = async function (knex: Knex) {
    await knex.schema.dropTableIfExists("working-areas");
};
