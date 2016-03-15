# Karma ES6 transpiler preprocessor

> Preprocessor for Karma that "transpiles" your ES6 Javascript code to ES5. It uses [es6-transpiler](https://github.com/termi/es6-transpiler)

## Installation

```
npm install karma-es6-transpiler-preprocessor --save-dev
```

## Use

Following code shows the default use of the preprocessor.

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    preprocessors: {
        '*.js': ['es6-transpiler'],
    }
  });
};
```
