import knex from '../connectors/pg';

export const getUser = (userId) => knex('users').where({ id: userId }).first();
