import { Database } from 'massive';

const database = new Database({
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD
});

// This returns a Promise, sooo... Make sure you do not use
// the instance before this has been resolved!
database.reload();

export default database;
