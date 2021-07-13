
exports.up = function(knex) {
    return knex.schema.createTable('Users', table => {
        table.increments('id').primary('id');
        table.string('username').notNullable().unique('username');
        table.string('fullname');
        table.string('email');
        table.string('password');
        table.timestamps(true, true);
    });
};

/**
 * @param {import("knex")} knex
 */
exports.down = function(knex){ return knex.schema.dropTableIfExists('Users'); }