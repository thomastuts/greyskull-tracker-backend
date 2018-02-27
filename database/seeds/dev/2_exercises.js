const { USERS } = require('./1_users');

const EXERCISES = [
  {
    name: 'Overhead Press',
    upperBody: true,
    weight: 28,
    user_id: USERS[0].id,
  },
  {
    name: 'Squat',
    upperBody: false,
    weight: 40,
    user_id: USERS[0].id,
  },
];

exports.EXERCISES = EXERCISES;

exports.seed = async function (knex) {
  await knex('exercises').del();
  await knex('exercises').insert(EXERCISES);
};
