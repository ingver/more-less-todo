const path = require('path');
const express = require('express');
const { compileFile } = require('pug');

const router = express.Router();
const Todo = require('./todo-model').create();

router.get('/',
    ensureLogin('/login'),
    (req, res, next) => {
        Todo.getList((err, list) => {
            if (err) {
                console.error(err);
                next(err);
            }
            const mainView = compileFile(path.join(__dirname, 'view.pug'));
            const data = mainView({
                title: 'More Less Todo (single user)',
                list,
            });
            res.send(data);
        });
    });

router.get('/get',
    ajaxEnsureLogin('/login'),
    (req, res) => {
        Todo.getList(ajaxHandleTodoData(res));
    });

router.post('/check',
    ajaxEnsureLogin('/login'),
    (req, res) => {
        const { id, checked } = req.body;
        //console.log('id:', id, ', checked', checked);

        Todo.check(id, checked, ajaxHandleTodoData(res));
    });

router.post('/add',
    ajaxEnsureLogin('/login'),
    (req, res) => {
        const text = req.body.text;
        //console.log('text', text);

        Todo.add(text, ajaxHandleTodoData(res));
    });

router.post('/remove',
    ajaxEnsureLogin('/login'),
    (req, res) => {
        const id = req.body.id;

        Todo.remove(id, ajaxHandleTodoData(res));
    });

router.use(express.static(path.join(__dirname, 'public')));

function ajaxHandleTodoData(res) {
    return (err, list) => {
        if (err) { return ajaxSendError(res, err); }

        //console.log('got the results: ', list);
        const todoView = compileFile(path.join(__dirname, 'todo-list.pug'));
        const data = {
            count: list.length,
            html: todoView({ list })
        };
        //console.log('data', data);
        res.json(data);
    };
}

function ajaxSendError(res, err) {
    console.error(err);
    return res.status(500).json({
        error: err.message
    });
}

function ensureLogin(redirect) {
    return (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect(redirect);
        }
        next();
    };
}

function ajaxEnsureLogin(redirect) {
    return (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ redirect });
        }
        next();
    };
}

module.exports = router;
