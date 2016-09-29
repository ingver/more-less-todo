const TodoModel = require('./model');

function initTodo(app) {
    const path = require('path');
    const express = require('express');
    const router = express.Router();

    const Todo = TodoModel.create();
    // initial data
    Todo.addItem('First');
    Todo.addItem('Second');
    Todo.check(1, true);

    router.get('/', function(req, res) {
        const viewPath = path.join(__dirname, 'view.pug');
        const list = Todo.getList();
        res.render(viewPath, { list }, function(err, html) {
            if (err) return console.error(err);
            res.send(html);
        });
    });

    router.get('/get', function(req, res) {
        console.log('Sending todo list to client');
        const list = Todo.getList();

        const viewPath = path.join(__dirname, 'todo-list.pug');
        res.render(viewPath, { list }, function(err, html) {
            if (err) return console.error(err);
            res.send(html);
        });
    });

    router.use(express.static(path.join(__dirname, 'public')));

    app.use('/todo', router);
}

exports.init = initTodo;
