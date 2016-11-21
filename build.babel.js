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
  bundle();
});

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
    .on('error', err => errorLog('Vueify Error', err))
    .transform(babelify)
    .on('error', err => errorLog('Babelify Error', err));
});

function bundle() {
  bundler.bundle()
    .on('error', err => errorLog('Browserify Error', err))
    .pipe(source(paths.localTodoDestName))
    .pipe(buffer())
    .pipe($.uglify())
    .on('error', $.util.log)
    .pipe(gulp.dest(paths.localTodoDest));
}
