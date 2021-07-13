/**
 * @param {import("knex")} knex
 */
exports.up = function(knex) {
    return knex.schema.createTable('Articles', table => {
        table.increments('id');
        table.string('ArticleName').notNullable();
        table.string('Tag').notNullable();
        table.string('Url').notNullable();
        table.string('Content').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex) {
  
};
