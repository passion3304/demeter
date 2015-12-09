var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var rename = require('gulp-rename');

gulp.task('default', function() {
  gulp.start('sass', 'jsx_transform', 'copy', 'browser-sync');
  gulp.watch('./app/js/**/*.js', ['jsx_transform']);
  gulp.watch('./dist/*.js', browserSync.reload);
  gulp.watch('./app/scss/**/*.scss', ['sass']);
  gulp.watch('./dist/*.css', browserSync.reload);

});

gulp.task('sass', function () {
  gulp.src('./app/scss/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

gulp.task('jsx_transform', function() {
  var bundleStream = browserify('./app/js/app.js', {debug: true}).transform(babelify).bundle().on('error', onError);

  bundleStream
    .pipe(source('bundle.js'))
    .pipe(rename('app.js'))
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

