const path = require('path');

const clientPath = path.join(__dirname, '..', '..', 'client'),
      localTodo  = path.join(clientPath, 'local-todo'),
      userTodo   = path.join(clientPath, 'user-todo');

module.exports = {
  client: {
    root: clientPath,
    localTodo,
    userTodo
  }
};
