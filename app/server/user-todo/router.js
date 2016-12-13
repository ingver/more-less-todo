const path            = require('path');
const express         = require('express');
const { compileFile } = require('pug');

const client = require('../config').paths.client;

const router = express.Router();
const Todo   = require('./models/todo-list').create();

router.get('/',
  ensureLogin('/login'),
  //logReq('get /u'),
  (req, res, next) => {
    Todo.getList(req.user.id, (err, list) => {
      if (err) {
        console.error('get /', err);
        return next(err);
      }
      const mainTemplate = compileFile(
        path.join(client.userTodo, 'index.pug'));
      const data = mainTemplate({
        title: 'More Less Todo',
        list,
      });
      res.send(data);
    });
  });

router.get('/get',
  ajaxEnsureLogin('/login'),
  (req, res) => {
    Todo.getList(req.user.id, ajaxHandleTodoData(res));
  });

router.post('/check',
  ajaxEnsureLogin('/login'),
  (req, res) => {
    const { id, complete } = req.body;

    Todo.check(id, complete, req.user.id, ajaxHandleTodoData(res));
  });

router.post('/add',
  ajaxEnsureLogin('/login'),
  (req, res) => {
    const text = req.body.text;

    Todo.add(text, req.user.id, ajaxHandleTodoData(res));
  });

router.post('/remove',
  ajaxEnsureLogin('/login'),
  (req, res) => {
    const todoId = req.body.id;

    Todo.remove(todoId, req.user.id, ajaxHandleTodoData(res));
  });

router.post('/edit',
  ajaxEnsureLogin('/login'),
  (req, res) => {
    const { id, text } = req.body;

    Todo.edit(id, text, req.user.id, ajaxHandleTodoData(res));
  });

router.use((err, req, res, next) => {
  console.error('***/u error***');
  console.error(err);
  res.status(500).send('<p>Something broke</p>');
});

function ajaxHandleTodoData(res) {
  return (err, list) => {
    if (err) {
      return ajaxSendError(res, err);
    }

    res.json({ list });
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
