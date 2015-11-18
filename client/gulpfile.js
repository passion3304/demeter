var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('default', function() {
  gulp.start('sass', 'jsx_transform', 'browser-sync');
});

gulp.task('sass', function () {
  gulp.src('./app/scss/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./'));
});

gulp.task('jsx_transform', function() {
  var bundleStream = browserify('./app/js/app.js').transform(babelify).bundle().on('error', onError);

  bundleStream
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build'));
});

gulp.watch('./app/js/*.js', ['jsx_transform']);
gulp.watch('./app/js/**/*.js', ['jsx_transform']);
gulp.watch('./build/*.js', browserSync.reload);

gulp.watch('./app/scss/*.scss', ['sass']);
gulp.watch('./*.css', browserSync.reload);

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

function onError(err) {
  console.log(err);
  this.emit('end');
}

