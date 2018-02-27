exports.up = function(knex) {
  return knex.schema.createTable('users', t => {
    t.increments('id').primary();
    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    t.string('username').notNull();
    t.string('password').notNull();
    t.string('salt').notNull();
    t.string('email');
    t.json('settings').notNullable().defaultTo('{}');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
