const pg = new require('pg');
const { is } = require('ramda');
const { validUserId } = require('../../utils');

const connStr = require('../../config').dbConnStr;

function TodoModel() { }

TodoModel.prototype.getList = function(userId, cb) {
    if (!validUserId(userId)) {
        return cb(new Error('invalid userId: ' + userId));
    }

    pg.connect(connStr, (err, client, done) => {
        if (err) {
            done();
            return cb(err);
        }

        sendAll(client, userId, done, cb);
    });
};

TodoModel.prototype.add = function(text, userId, cb) {
    if (!is(String, text) || text === '') {
        return cb(new Error('text must be non-empty string'));
    } else if (!validUserId(userId)) {
        return cb(new Error('invalid userId ' + userId));
    }

    pg.connect(connStr, (err, client, done) => {
        if (err) {
            done();
            return cb(err);
        }

        client
            .query('INSERT INTO todos(text, complete, user_id) VALUES ($1, $2, $3)',
                   [text, false, userId])
            .then(() => sendAll(client, userId, done, cb))
            .catch(err => {
                done();
                cb(err);
            });
    });
};

TodoModel.prototype.remove = function(todoId, userId, cb) {
    if (!is(Number, todoId)) {
        return cb(new Error('invalid todoId: ' + todoId));
    } else if (!validUserId(userId)) {
        return cb(new Error('invalid userId ' + userId));
    }

    pg.connect(connStr, (err, client, done) => {
        if (err) {
            done();
            return cb(err);
        }

        client
            .query('DELETE FROM todos WHERE id = $1', [todoId])
            .then(() => sendAll(client, userId, done, cb))
            .catch(err => {
                done();
                cb(err);
            });
    });
};

TodoModel.prototype.check = function(todoId, checked, userId, cb) {
    if (!is(Number, todoId)) {
        return cb(new Error('invalid todoId ' + todoId));
    } else if (!is(Boolean, checked)) {
        return cb(new Error('checked must be boolean'));
    } else if (!validUserId(userId)) {
        return cb(new Error('invalid userId ' + userId));
    }

    pg.connect(connStr, (err, client, done) => {
        if (err) {
            done();
            cb(err);
        }

        client
            .query('UPDATE todos SET complete = $2 WHERE id = $1',
                   [todoId, checked])
            .then(() => sendAll(client, userId, done, cb))
            .catch(err => {
                done();
                cb(err);
            });
    });
};

function sendAll(client, userId, done, cb) {
    client
        .query('SELECT * FROM todos WHERE user_id = $1 ORDER BY id ASC',
               [userId])
        .then(data => {
            done();
            cb(null, data.rows);
        })
        .catch(err => {
            done();
            cb(err);
        });
}

module.exports.create = () => new TodoModel();
