const express = require('express');
const path = require('path');
const { renderSafe } = require('../utils');

const router = express.Router();
const Todo = require('./todo-model').create();
const mainViewPath = path.join(__dirname, 'view.pug');
const todoViewPath = path.join(__dirname, 'todo-list.pug');

router.get('/', function(req, res, next) {
    Todo.getList(function(err, list) {
        if (err) {
            console.error(err);
            next(err);
        }
        console.log('got the results: ', list);
        res.json(list);
    });

});

router.post('/check', function(req, res, next) {
    const { id, checked } = req.body;

    Todo.check(id, checked, function(err, list) {
        if (err) {
            console.error(err);
            next(err);
        }
        console.log('got the results: ', list);
        res.json(list);
    });
});

router.post('/add', function(req, res, next) {
    const text = req.body.text;
    console.log('text', text);

    Todo.add(text, function(err, list) {
        if (err) {
            console.error(err);
            next(err);
        }

        console.log('got the results: ', list);
        res.json(list);
    });
});

router.post('/remove', function(req, res, next) {
    const id = req.body.id;

    Todo.remove(id, function(err, list) {
        if (err) {
            console.error(err);
            next(err);
        }

        console.log('got the results: ', list);
        res.json(list);
    });
});

//router.use(express.static(path.join(__dirname, 'public')));

module.exports = router;
