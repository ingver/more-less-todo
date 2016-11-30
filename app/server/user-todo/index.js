function initUser(app) {
  const router = require('./router');

  app.use('/u', router);
}

module.exports.init = initUser;
