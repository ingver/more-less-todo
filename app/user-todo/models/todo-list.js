const pg = new require('pg');
const { is } = require('ramda');
const { validUserId } = require('../../common/utils');

const connStr = require('../../config').dbConnStr;

function TodoModel() { }

TodoModel.prototype.getList = function(userId, cb) {
    if (!validUserId(userId)) {
        return cb(new Error('invalid userId: ' + userId));
    }

    pg.connect(connStr, (err, client, done) => {
        if (err) { done(); return cb(err); }

        sendAll(client, userId, done, cb);
    });
};

TodoModel.prototype.add = function(text, userId, cb) {
    if (!is(String, text) || text === '') {
        return cb(new Error('text must be non-empty string'));
    } else if (!validUserId(userId)) {
        return cb(new Error('invalid userId: ' + userId));
    }

    invokeQuery('INSERT INTO todos(text, user_id) VALUES ($1, $2)',
                [text, userId], userId, cb);
};

TodoModel.prototype.remove = function(todoId, userId, cb) {
    if (!is(Number, todoId)) {
        return cb(new Error('invalid todoId: ' + todoId));
    } else if (!validUserId(userId)) {
        return cb(new Error('invalid userId: ' + userId));
    }

    invokeQuery('DELETE FROM todos WHERE id = $1',
                [todoId], userId, cb);
};

TodoModel.prototype.check = function(todoId, checked, userId, cb) {
    if (!is(Number, todoId)) {
        return cb(new Error('invalid todoId: ' + todoId));
    } else if (!is(Boolean, checked)) {
        return cb(new Error('checked must be boolean'));
    } else if (!validUserId(userId)) {
        return cb(new Error('invalid userId: ' + userId));
    }

    invokeQuery('UPDATE todos SET complete = $1 WHERE id = $2',
                [checked, todoId], userId, cb);
};

TodoModel.prototype.edit = function(todoId, text, userId, cb) {
    if (!is(Number, todoId)) {
        return cb(new Error('invalid todoId: ' + todoId));
    } else if (!is(String, text) || text === '') {
        return cb(new Error('text must be non-empty string'));
    } else if (!validUserId(userId)) {
        return cb(new Error('invalid userId: ' + userId));
    }

    invokeQuery('UPDATE todos SET text = $1 WHERE id = $2',
                [text, todoId], userId, cb);
};

function invokeQuery(query, params, userId, cb) {
    pg.connect(connStr, (err, client, done) => {
        if (err) { done(); return cb(err); }

        client.query(query, params)
            .then(() => sendAll(client, userId, done, cb))
            .catch(err => {
                done();
                cb(err);
            });
    });
}

function sendAll(client, userId, done, cb) {

    client.query('SELECT * FROM todos WHERE user_id = $1 ORDER BY id ASC',
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
