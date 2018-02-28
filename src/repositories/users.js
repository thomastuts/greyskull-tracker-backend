import db from '../connectors/massive';

import { createPasswordHash } from '../lib/auth';

export const createUser = async ({ username, plaintextPassword, email }) => {
  const user = {
    username,
    email,
    password: await createPasswordHash(plaintextPassword),
  };

  return db.users.save(user);
};

export const getUserById = (userId) => db.users.findOne({ id: userId }, { fields: ['id', 'username', 'email', 'created_at'] });
export const getUserByUsername = (username) => db.users.findOne({ username }, { fields: ['id', 'username', 'email', 'created_at'] });
