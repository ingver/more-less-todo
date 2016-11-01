const path = require('path');
const pug  = require('pug');
const fs   = require('fs');

const fileName   = 'todo-list';
const commonPath = path.join(__dirname, 'common');
const src        = path.join(commonPath, 'templates', fileName + '.pug');
const destDir    = path.join(commonPath, 'public', 'templates');
const dest       = path.join(destDir, fileName + '.tmpl.js');
const tmplStr    = pug.compileFileClient(src, { name: 'todoListTemplate' });

fs.mkdirSync(destDir);
fs.writeFileSync(dest, tmplStr);
