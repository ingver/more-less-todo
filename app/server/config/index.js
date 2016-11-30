const paths = require('./paths');

const dbName = 'todo';
const config = {
  redisStore: {
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  },
  dbConnStr: process.env.DATABASE_URL || ('postgres://localhost:5432/' + dbName),
  sessionSecret: process.env.SESSION_SECRET || '8@gwd<hjRh-78_Gs%q`H',
  paths
};

module.exports = config;
