import gulp       from 'gulp';

import source     from 'vinyl-source-stream';
import buffer     from 'vinyl-buffer';

import browserify from 'browserify';
import babelify   from 'babelify';
import vueify     from 'vueify';

import { paths }  from './config';
import { gulpPlugins as $, errorLog } from './tasks/util';

gulp.task('default', ['build']);

gulp.task('build', () => {

  /*
   * bundle client code
   */
  browserify({
    entries: paths.localTodoEntry,
    cache: {},
    packageCache: {}
  })
    .transform(vueify)
    .on('error', err => errorLog('Vueify Error', err))
    .transform(babelify)
    .on('error', err => errorLog('Babelify Error', err))
    .bundle()
    .on('error', err => errorLog('Browserify Error', err))
    .pipe(source(paths.destName))
    .pipe(buffer())
    .pipe($.uglify())
    .on('error', $.util.log)
    .pipe(gulp.dest(paths.localTodoDest));

  browserify({
    entries: paths.userTodoEntry,
    cache: {},
    packageCache: {}
  })
    .transform(vueify)
    .on('error', err => errorLog('Vueify Error', err))
    .transform(babelify)
    .on('error', err => errorLog('Babelify Error', err))
    .bundle()
    .on('error', err => errorLog('Browserify Error', err))
    .pipe(source(paths.destName))
    .pipe(buffer())
    .pipe($.uglify())
    .on('error', $.util.log)
    .pipe(gulp.dest(paths.userTodoDest));
});
