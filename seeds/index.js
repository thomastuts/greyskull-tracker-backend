require('dotenv').config();
const massive = require('massive');
const glob = require('glob');
const path = require('path');
const async = require('async');

massive({
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
}).then(function (db) {
  const MIGRATION_FILES = glob.sync(path.join(__dirname, '*.js')).filter(p => !p.endsWith('index.js'));

  async.series(
    MIGRATION_FILES.map((MIGRATION_FILE) => {
      return function (callback) {
        console.log('Running migration file:', path.parse(MIGRATION_FILE).base);
        require(MIGRATION_FILE).seed(db).then(callback);
      };
    }),
    () => {
      console.log('Done migrating');
      process.exit(0);
    }
  );
});
