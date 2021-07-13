
/**
 * @param {import("knex")} knex
 */
exports.up = function(knex)  {
    return knex.schema.createTable('User_Roles', table => {
        table.increments('id');
        table.integer('user_id').unsigned().references('id').inTable('Users');
        table.integer('role_id').unsigned().references('id').inTable('Roles');
    });
}

/**
 * @param {import("knex")} knex
 */
exports.down = function(knex) { return knex.schema.dropTableIfExists('User_Roles'); }
