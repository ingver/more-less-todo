const pg = require('pg');

const connStr = require('./config').dbConnStr;

pg.connect(connStr, (err, client, done) => {
  if (err) {
    done();
    return console.error(err);
  }
  client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(80) UNIQUE NOT NULL,
        email VARCHAR(80) NOT NULL,
        password VARCHAR(80) NOT NULL
      );`)
    .then(() => {
      console.log('create users table');
      return client.query(`
        CREATE TABLE todos (
          id SERIAL PRIMARY KEY,
          text TEXT NOT NULL,
          complete BOOLEAN DEFAULT false,
          user_id integer REFERENCES users(id) ON DELETE CASCADE
        );`);
    })
    .then(() => {
      done();
      console.log('created todos table');
      process.exit(0);
    })
    .catch(err => {
      done();
      console.error(err);
      process.exit(0);
    });
});
