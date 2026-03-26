import {Knex} from "knex";

exports.up = async function (knex: Knex) {
    await knex.schema.table("working-areas", (table) => {
        table.uuid('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .nullable();
    });
};

exports.down = async function (knex: Knex) {
    await knex.schema.table("working-areas", (table) => {
        table.dropColumn("user_id");
    });
};
