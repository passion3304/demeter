var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var gulpif = require('gulp-if')
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var jest = require('gulp-jest-iojs')
var Server = require('karma').Server;


gulp.task('default', function() {
  runBrowserifyTask({
    watch: true,
    dest: './dist',
    uglify: false
  })

  gulp.start('sass', 'copy', 'browser-sync');
  gulp.watch('./dist/*.js', browserSync.reload);
  gulp.watch('./app/scss/**/*.scss', ['sass']);
  gulp.watch('./dist/*.css', browserSync.reload);

});

var runBrowserifyTask = function(options) {
  var vendorBundler = browserify({
    debug: true
  })
  .require([
    'react',
    'react-dom',
    'react-bootstrap',
    'three',
    'react-three',
    'three-orbit-controls',
    'three.trackball',
    'flux',
    'lodash',
    'q',
    'suncalc',
    'schema-inspector',
    'classnames',
    'node-uuid',
    'bootstrap-sass',
    'moment'
  ]);

  var bundler = browserify({
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  })
  .require(require.resolve('./app/js/app.js'), { entry: true })
  .transform('babelify')
  .external([
    'react',
    'react-dom',
    'react-bootstrap',
    'three',
    'react-three',
    'three-orbit-controls',
    'three.trackball',
    'flux',
    'lodash',
    'q',
    'suncalc',
    'schema-inspector',
    'classnames',
    'node-uuid',
    'bootstrap-sass',
    'moment'
  ]);

  var rebundle = function() {
    bundler.bundle()
      .on('error', function(err) {
        console.log(err)
      })
    .pipe(source('bundle.js'))
    //.pipe(gulpif(options.uglify, streamify(uglify())))
    .pipe(rename('app.js'))
    .pipe(gulp.dest(options.dest));
  }

  if (options.watch) {
    bundler = watchify(bundler);
    bundler.on('update', rebundle);
  }

  vendorBundler.bundle()
  .pipe(source('vendors.js'))
  //.pipe(streamify((uglify())))
  .pipe(gulp.dest(options.dest));

  return rebundle();
}

gulp.task('sass', function () {
  gulp.src('./app/scss/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});


gulp.task('copy', function() {
  gulp.src('./node_modules/font-awesome/fonts/*.*')
    .pipe(gulp.dest('./dist/fonts'));
  gulp.src('./index.html')
    .pipe(gulp.dest('./dist'));
});


gulp.task('jest', function() {
  return gulp.src('__tests__').pipe(jest({
    scriptPreprocessor: '../node_modules/babel-jest',
    unmockedModulePathPatterns: [
      '../node_modules/react'

    ]
  }));
});

gulp.task('react-three', function() {
  gulp.src('./app/js/lib/react-three/es5/*.js')
    .pipe(gulp.dest('./node_modules/react-three/es5/'))
});


// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
});


