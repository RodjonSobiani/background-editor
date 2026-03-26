

import {Knex} from "knex";

exports.up = async function (knex: Knex) {
    await knex.schema.createTable("edits", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.uuid('image_id')
            .references('id')
            .inTable('images')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNullable();
        table.string('image').notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = async function (knex: Knex) {
    await knex.schema.dropTableIfExists("edits");
};
