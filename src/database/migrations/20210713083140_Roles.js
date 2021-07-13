/**
 * @param {import("knex")} knex
 */
exports.up = function(knex) {
    return knex.schema.createTable('Roles', table => {
        table.increments('id');
        table.string('name');
    });
}

/**
 * @param {import("knex")} knex
 */
exports.down = function(knex){ return knex.schema.dropTableIfExists('Roles'); }