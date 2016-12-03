import gulp        from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import rename      from 'gulp-rename';
import glob        from 'glob';
import del         from 'del';

import source      from 'vinyl-source-stream';
import buffer      from 'vinyl-buffer';
import es          from 'event-stream';
import browserSync from 'browser-sync';

import browserify  from 'browserify';
import babelify    from 'babelify';
import vueify      from 'vueify';



const clientDir = 'app/client/',
      builtScripts = clientDir + '/**/public/bundle.js';

const bs = browserSync.create();
const $ = loadPlugins();



gulp.task('default', ['bsync']);



gulp.task('bsync', ['serve', 'watch'], () => {

  glob(builtScripts, (err, files) => {

    if (err) { console.error(err); return; }

    bs.init({
      proxy: 'localhost:5000',
      files,
      open: false
    });
  });

});



gulp.task('watch', ['build'], () => {
  const globs = [
    clientDir + '/**/main.js',
    clientDir + '/**/*.vue'
  ];
  return gulp.watch(globs, ['build'])
    .on('error', errHandler());
});



gulp.task('build', done => {

  glob(clientDir + '**/main.js', (err, files) => {

    if(err) { console.error(err); done(err); return; }

    const tasks = files.map(entry => {
      return browserify({
        entries: [entry]
      })
        .transform(vueify)
        .transform(babelify)
        .bundle()
        .on('error', errHandler('Browserify Error:'))
        .pipe(source(entry))
        .pipe(rename(path => {
          path.dirname = path.dirname.slice(clientDir.length) + '/public';
          path.basename = 'bundle';
        }))
        .pipe(buffer())
        .pipe($.sourcemaps.init({ loadMaps: true }))
        .on('error', errHandler('SourceMaps error:'))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(clientDir));
    });

    es.merge(tasks)
      .on('error', errHandler('Streams Merge Error'))
      .on('end', done);
  });
});



gulp.task('build:prod', ['clean'], done => {

  glob(clientDir + '**/main.js', (err, files) => {

    if(err) { console.error(err); done(err); return; }

    const tasks = files.map(entry => {
      return browserify({
        entries: [entry]
      })
        .transform(vueify)
        .transform(babelify)
        .bundle()
        .on('error', errHandler('Browserify Error:'))
        .pipe(source(entry))
        .pipe(rename(path => {
          path.dirname = path.dirname.slice(clientDir.length) + '/public';
          path.basename = 'bundle';
        }))
        .pipe(buffer())
        .pipe($.uglify())
        .on('error', errHandler('Uglify error:'))
        .pipe(gulp.dest(clientDir));
    });

    es.merge(tasks)
      .on('error', errHandler('Streams Merge Error'))
      .on('end', done);
  });
});



gulp.task('clean', () => {
  return del(clientDir + '**/public/**');
});



gulp.task('serve', () => {
  return $.nodemon({
    script: './index.js',
    // watch code and configs
    ext: 'js json',
    // ignore client-side code
    ignore: ['app/client/**']
  });
});



const errHandler = (msg) => {
  return function(err) {
    if (msg) {
      console.error(msg);
    }
    console.error(err.message);
    this.emit('end');
  };
};
