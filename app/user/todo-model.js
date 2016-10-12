const { is } = require('ramda');
const pg = require('pg');
const connStr = require('../config').dbConnStr;

function TodoModel() {
}

TodoModel.prototype.getList = function(cb) {
    pg.connect(connStr, (err, client, done) => {
        if (err) { done(); cb(err); }

        sendAll(client, done, cb);
    });
};

TodoModel.prototype.add = function(text, cb) {
    if (typeof text !== 'string' || text === '') {
        cb(new Error('text must be non-empty string'));
    }

    pg.connect(connStr, (err, client, done) => {
        if (err) { done(); cb(err); }

        client
            .query('INSERT INTO todo_single(text, complete) VALUES ($1, $2)',
                   [text, false])
            .catch(err => cb(err));

        sendAll(client, done, cb);
    });
};

TodoModel.prototype.remove = function(id, cb) {
    if (!is(Number, id)) { cb(new Error('id must be a number')); }

    pg.connect(connStr, (err, client, done) => {
        if (err) { done(); cb(err); }

        client
            .query('DELETE FROM todo_single WHERE id = $1', [id])
            .catch(err => cb(err));

        sendAll(client, done, cb);
    });
};

TodoModel.prototype.check = function(id, checked, cb) {
    if (!is(Number, id)) { cb(new Error('id must be a number')); }
    if (!is(Boolean, checked)) { cb(new Error('checked must be a boolean')); }

    pg.connect(connStr, (err, client, done) => {
        if (err) { done(); cb(err); }

        client
            .query('UPDATE todo_single SET complete = $1 WHERE id = $2',
                   [checked, id])
            .catch(err => cb(err));

        sendAll(client, done, cb);
    });
};

function sendAll(client, done, cb) {
    client
        .query('SELECT * FROM todo_single ORDER BY id ASC')
        .then(data => {
            done();
            cb(null, data.rows);
        })
        .catch(err => {
            done();
            console.log('error:', err);
        });
}

module.exports.create = () => new TodoModel();
