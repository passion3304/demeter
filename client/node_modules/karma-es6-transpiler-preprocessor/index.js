var es6tr = require("es6-transpiler");

var createES6TranspilerPreprocessor = function(args, config, logger, helper) {
  config = config || {};
  var log = logger.create('preprocessor.es6-transpiler');
  var defaultOptions = {
  };
  var options = helper.merge(defaultOptions, args.options || {}, config.options || {});

  var transformPath = args.transformPath || config.transformPath || function(filepath) {
    return filepath.replace(/\.es6.js$/, '.js').replace(/\.es6$/, '.js');
  };

  return function(content, file, done) {
    log.info('Processing "%s".', file.originalPath);
    file.path = transformPath(file.originalPath);
    options.filename = file.originalPath;

    var result = es6tr.run({
      filename: options.filename
    });
    var transpiledContent = result.src;

    result.errors.forEach(function(err) {
      log.error(err);
    });

    if (result.errors.length) {
      return done(new Error('ES6-TRANSPILER COMPILE ERRORS\n' + result.errors.join('\n')));
    }

    // TODO: add sourceMap to transpiledContent

    return done(null, transpiledContent);
  };
};

createES6TranspilerPreprocessor.$inject = ['args', 'config.es6TranspilerPreprocessor', 'logger', 'helper'];

// export es6-transpiler preprocessor
module.exports = {
  'preprocessor:es6-transpiler': ['factory', createES6TranspilerPreprocessor]
};
