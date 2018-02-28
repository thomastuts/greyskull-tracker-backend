import bcrypt from 'bcrypt';

export function createPasswordHash(plaintextPassword) {
  return bcrypt.hash(plaintextPassword, 10);
}

export function comparePassword(plaintextPassword, hash) {
  return bcrypt.compare(plaintextPassword, hash);
}
