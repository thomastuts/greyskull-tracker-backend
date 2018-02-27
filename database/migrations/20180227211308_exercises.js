exports.up = function(knex) {
  return knex.schema.createTable('exercises', t => {
    t.increments('id').primary();
    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    t.integer('user_id').notNullable().references('users.id');
    t.string('name').notNull();
    t.integer('weight').notNull();
    t.boolean('upperBody').notNull();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('exercises');
};
