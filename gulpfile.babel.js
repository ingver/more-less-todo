import gulp        from 'gulp';

import source      from 'vinyl-source-stream';
import buffer      from 'vinyl-buffer';

import browserify  from 'browserify';
import hmr         from 'browserify-hmr';
import babelify    from 'babelify';
import watchify    from 'watchify';
import vueify      from 'vueify';

import { paths } from './config';
import { gulpPlugins as $, errorLog } from './tasks/util';

/*
 * make a bundler
 */
let bundler1, bundler2;

gulp.task('browserify', () => {

  bundler1 = browserify({
    entries: paths.localTodoEntry,
    cache: {},
    packageCache: {}
  })
    .transform(vueify)
    .on('error', err => errorLog('Vueify Error', err))
    .transform(babelify)
    .on('error', err => errorLog('Babelify Error', err));

  bundler2 = browserify({
    entries: paths.userTodoEntry,
    cache: {},
    packageCache: {}
  })
    .transform(vueify)
    .on('error', err => errorLog('Vueify Error', err))
    .transform(babelify)
    .on('error', err => errorLog('Babelify Error', err));
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
gulp.task('local-todo', ['browserify'], () => {
  bundler1
    .plugin(watchify)
    .plugin(hmr)
    .on('update', bundle1);

  bundle1();
});

gulp.task('user-todo', ['browserify'], () => {
  bundler2
    .plugin(watchify)
    .plugin(hmr)
    .on('update', bundle2);

  bundle2();
});


/*
 * start server and watch all changes
 */
gulp.task('default', ['serve']);


function bundle1() {
  bundler1.bundle()
    .on('error', err => errorLog('Browserify Error', err))
    .pipe(source(paths.destName))
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .on('error', $.util.log)
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(paths.localTodoDest));
}

function bundle2() {
  bundler2.bundle()
    .on('error', err => errorLog('Browserify Error', err))
    .pipe(source(paths.destName))
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .on('error', $.util.log)
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(paths.userTodoDest));
}
