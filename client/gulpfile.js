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
    'bootstrap-sass'
  ]);

  var bundler = browserify({
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  })
  .require(require.resolve('./app/js/app.js'), { entry: true })
  .transform(babelify)
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
    'bootstrap-sass'
  ]);

  var rebundle = function() {
    bundler.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulpif(options.uglify, streamify(uglify())))
    .pipe(rename('app.js'))
    .pipe(gulp.dest(options.dest));
  }

  if (options.watch) {
    bundler = watchify(bundler);
    bundler.on('update', rebundle);
  }

  vendorBundler.bundle()
  .pipe(source('vendors.js'))
  .pipe(streamify((uglify())))
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

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
});

function onError(err) {
  console.log(err);
  this.emit('end');
}


