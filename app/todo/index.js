const path = require('path');
const express = require('express');
const { renderSafe } = require('../utils');

function initTodo(app) {
    const viewPath = path.join(__dirname, 'view.pug');

    // local todo list
    const title = 'More Less Todo (local)';
    app.get('/todo', function(req, res) {
        renderSafe(res, viewPath, { title });
    });

    app.use('/todo', express.static(path.join(__dirname, 'public')));
}


exports.init = initTodo;
