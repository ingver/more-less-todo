const path           = require('path');
const express        = require('express');
const { renderSafe } = require('../utils');
const clientPaths    = require('../config').paths.client;


function initTodo(app) {
  const localTodoPath = clientPaths.localTodo;
  const templatePath = path.join(localTodoPath, 'index.pug');

  // local todo list
  const title = 'More Less Todo (local)';
  app.get('/local-todo', function(req, res) {
    renderSafe(res, templatePath, { title });
  });

  app.use('/local-todo', express.static(path.join(localTodoPath, 'public')));
}


exports.init = initTodo;
