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

exports.seed = async function (db) {
  await db.exercises.destroy();
  await Promise.all(EXERCISES.map(exercise => db.exercises.insert(exercise)));
};
