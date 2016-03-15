var assert = require('assert');
var gulp   = require('gulp')
var gutil  = require('gulp-util');
var jest   = require('./index');
var out    = process.stdout.write.bind(process.stdout);

it('should take a rootDir as an option', function (cb) {
    var stream = jest({
        rootDir: '__tests__'
    });

    process.stdout.write = function (str) {
        out(str);
        if (/test passed/.test(str)) {
            assert(true);
            process.stdout.write = out;
            cb();
        }
    };

    stream.write(new gutil.File({
        path: '__tests__',
        contents: new Buffer('')
    }));

    stream.end();
});


it('should use the scream path as the rootDir', function (cb) {
    gulp.src('__tests__').pipe(jest());

    process.stdout.write = function (str) {
        out(str);

        if (/test passed/.test(str)) {
            assert(true);
            process.stdout.write = out;
            cb();
        }
    };
});
