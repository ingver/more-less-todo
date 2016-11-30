import gulp       from 'gulp';

import source     from 'vinyl-source-stream';
import buffer     from 'vinyl-buffer';

import browserify from 'browserify';
import babelify   from 'babelify';
import vueify     from 'vueify';

import { paths }  from './config';
import { gulpPlugins as $, errorLog } from './tasks/util';


/*
 * bundle client code
 */
gulp.task('default', ['browserify'], () => {
  bundle1();
  bundle2();
});

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

function bundle1() {
  bundler1.bundle()
    .on('error', err => errorLog('Browserify Error', err))
    .pipe(source(paths.destName))
    .pipe(buffer())
    .pipe($.uglify())
    .on('error', $.util.log)
    .pipe(gulp.dest(paths.localTodoDest));
}

function bundle2() {
  bundler2.bundle()
    .on('error', err => errorLog('Browserify Error', err))
    .pipe(source(paths.destName))
    .pipe(buffer())
    .pipe($.uglify())
    .on('error', $.util.log)
    .pipe(gulp.dest(paths.userTodoDest));
}
