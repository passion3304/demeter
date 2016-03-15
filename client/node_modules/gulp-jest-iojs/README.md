[![Build Status](https://travis-ci.org/binarykitchen/gulp-jest-iojs.svg?branch=master)](https://travis-ci.org/binarykitchen/gulp-jest-iojs)

# [gulp](http://gulpjs.com)-jest-iojs

Gulp plugin for Jest on io.js, originally forked from https://github.com/Dakuan/gulp-jest

## Installation

```bash
$ npm i -D gulp-jest-iojs
```

## Usage

```javascript
var jest = require('gulp-jest-iojs');

gulp.task('jest', function () {
    return gulp.src('__tests__').pipe(jest({
        scriptPreprocessor: "./spec/support/preprocessor.js",
        unmockedModulePathPatterns: [
            "node_modules/react"
        ],
        testDirectoryName: "spec",
        testPathIgnorePatterns: [
            "node_modules",
            "spec/support"
        ],
        moduleFileExtensions: [
            "js",
            "json",
            "react"
        ]
    }));
});

```


## API

### jest(options)

#### options

as per [Jest config](http://facebook.github.io/jest/docs/api.html#config-options)


## License

MIT © [Michael Heuberger](http://www.binarykitchen.com), [Dominic Barker](http://www.dombarker.co.uk)
