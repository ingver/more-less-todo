const config = {
  redisStore: {
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  },
  dbConnStr: process.env.DATABASE_URL || 'postgres://localhost:5432/todo',
  sessionSecret: process.env.SESSION_SECRET || '8@gwd<hjRh-78_Gs%q`H'
};

module.exports = config;
