import gulp        from 'gulp';
import loadPlugins from 'gulp-load-plugins';

import source      from 'vinyl-source-stream';
import buffer      from 'vinyl-buffer';

import browserify  from 'browserify';
import hmr         from 'browserify-hmr';
import babelify    from 'babelify';
import watchify    from 'watchify';
import vueify      from 'vueify';

const $ = loadPlugins();
console.log($);


const paths = {
  localTodoEntry: './app/local-todo/client/main.js',
  localTodoDestName: 'bundle.js',
  localTodoDest: './app/local-todo/public'
};


/*
 * make a bundler
 */
let bundler;
gulp.task('browserify', () => {

  bundler = browserify({
    entries: paths.localTodoEntry,
    cache: {},
    packageCache: {}
  })
    .transform(vueify)
    .transform(babelify);
});

/*
 * just bundle client code
 */
gulp.task('build', ['browserify'], () => {
  bundle();
});

/*
 * start a server and watch code changes
 */
gulp.task('serve', () => {
  return $.nodemon({
    script: './index.js',
    // watch code and configs
    ext: 'js json',
    // ignore client-side code
    ignore: ['**/public/**', '**/client/**']
  });
});


/*
 * sync browser with client-side code changes
 */
gulp.task('browser-sync', ['browserify'], () => {
  bundler
    .plugin(watchify)
    .plugin(hmr)
    .on('update', bundle);

  bundle();
});


/*
 * start server and watch all changes
 */
gulp.task('watch', ['browser-sync', 'serve']);


function bundle() {
  bundler.bundle()
    .on('error', err => {
      $.util.log('Browserify Error', $.util.colors.red(err.message));
    })
    .pipe(source(paths.localTodoDestName))
    .pipe(buffer())
    .pipe($.uglify())
    .pipe(gulp.dest(paths.localTodoDest));
}
