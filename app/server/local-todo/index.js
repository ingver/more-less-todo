const path           = require('path');
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
}


exports.init = initTodo;
