const path = require('path');
const express = require('express');
const { renderSafe } = require('../common/utils');

function initTodo(app) {
    const templatePath = path.join(
        __dirname, 'templates', 'local-todo.pug');

    // local todo list
    const title = 'More Less Todo (local)';
    app.get('/local-todo', function(req, res) {
        renderSafe(res, templatePath, { title });
    });

    app.use('/local-todo', express.static(path.join(__dirname, 'public')));
}


exports.init = initTodo;
