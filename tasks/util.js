import loadPlugins from 'gulp-load-plugins';

export const gulpPlugins = loadPlugins();
const $ = gulpPlugins;

export const errorLog = (msg, err) =>
  $.util.log(msg, $.util.colors.red(err.message));
