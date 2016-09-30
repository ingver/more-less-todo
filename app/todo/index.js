function initTodo(app) {
    const { is, type } = require('ramda');
    const TodoModel = require('./model');
    const path = require('path');
    const express = require('express');
    const router = express.Router();

    const Todo = TodoModel.create();
    const mainViewPath = path.join(__dirname, 'view.pug');
    const todoViewPath = path.join(__dirname, 'todo-list.pug');

    // initial data
    Todo.addItem('First');
    Todo.addItem('Second');
    Todo.check(1, true);

    router.get('/', function(req, res) {
        const list = Todo.getList();

        renderSafe(res, mainViewPath, { list });
    });

    router.post('/check', function(req, res) {
        const { id, checked } = req.body;

        if (is(Number, id) && is(Boolean, checked)) {
            Todo.check(id, checked);
        } else {
            const msg = 'invalid id or checked';
            console.error(msg);
        }

        // update client view
        const list = Todo.getList();
        renderSafe(res, todoViewPath, { list });
    });

    router.post('/add', function(req, res) {
        const text = req.body.text;

        if (is(String, text)) {
            Todo.addItem(text);
        } else {
            console.error('invalid parameter `text`');
        }

        // update client view
        const list = Todo.getList();
        renderSafe(res, todoViewPath, { list });
    });

    router.post('/remove', function(req, res) {
        const id = req.body.id;

        if (is(Number, id)) {
            Todo.remove(id);
        } else {
            console.error('invalid `id`');
        }

        // update client view
        const list = Todo.getList();
        renderSafe(res, todoViewPath, { list });
    });

    router.use(express.static(path.join(__dirname, 'public')));

    app.use('/todo', router);
}

function renderSafe(res, path, data) {
    res.render(path, data, function(err, html) {
        if (err) return console.error(err);
        res.end(html);
    });
}

exports.init = initTodo;