const USERS = [
  {
    id: 1,
    username: 'thomastuts',
    password: 'TODO',
    settings: { unit: 'KG' },
  }
];

exports.USERS = USERS;

exports.seed = async function (db) {
  await db.users.destroy();
  await db.users.insert(USERS);
};
