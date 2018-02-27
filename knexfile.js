require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
    migrations: {
      directory: './database/migrations',
      tableName: '_knex_migrations'
    },
    seeds: {
      directory: './database/seeds/dev',
    },
  },
};
