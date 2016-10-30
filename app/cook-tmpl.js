const path = require('path');
const pug = require('pug');
const fs = require('fs');

const fileName = 'todo-list';
const commonPath = path.join(__dirname, 'common');
const src = path.join(commonPath, 'templates', fileName + '.pug');
const dest = path.join(commonPath, 'public', 'templates', fileName + '.tmpl.js');

const tmplStr = pug.compileFileClient(src, { name: 'todoListTemplate' });
fs.writeFileSync(dest, tmplStr);
