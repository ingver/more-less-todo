const pg              = require('pg');
const { is }          = require('ramda');
const { validUserId } = require('../common/utils');

const connStr = require('../config').dbConnStr;

function User() { }

User.prototype.findById = function(id, cb) {
  if (!validUserId(id)) {
    return cb(new Error('invalid userId: ' + id));
  }

  pg.connect(connStr, (err, client, done) => {
    if (err) {
      done();
      return cb(err);
    }

    client.query('SELECT * FROM users WHERE id = $1', [id])
      .then(data => {
        done();
        cb(null, data.rows[0]);
      })
      .catch(err => {
        done();
        cb(err);
      });
  });
};

User.prototype.findByName = function(name, cb) {
  if (!is(String, name) || name === '') {
    return cb(new Error('invalid user name (must not empty string'));
  }

  pg.connect(connStr, (err, client, done) => {
    if (err) {
      done();
      return cb(err);
    }

    client.query('SELECT * FROM users WHERE name = $1', [name])
      .then(data => {
        done();
        cb(null, data.rows[0]);
      })
      .catch(err => {
        done();
        cb(err);
      });
  });
};

module.exports.create = () => new User();
