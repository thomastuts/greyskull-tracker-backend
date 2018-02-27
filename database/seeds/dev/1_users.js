const USERS = [
  {
    id: 1,
    username: 'thomastuts',
    password: 'TODO',
    salt: 'TODO',
    settings: { unit: 'KG' },
  }
];

exports.USERS = USERS;

exports.seed = async function (knex) {
  await knex('users').del();
  await knex('users').insert(USERS);
};
