var _ = require('lodash');
var inspector = require('schema-inspector');
var controls = require('./controls-config');


var controlSchema = {
  type: 'object',
  properties: {
    name: {type: 'string'},
    locations: {type: 'array'},
    icon: {type: 'string'}
  }
};

var validateControls = function(controlsToValidate) {

  var invalidControls = [];

  _.forEach(controlsToValidate, function(control) {
    if (!inspector.validate(controlSchema, control).valid) {
      invalidControls.push(control);
    }
  });

  return invalidControls.length <= 0;
};

var loadControls = function() {
  if (validateControls(controls)) {
    return controls;
  } else {
    throw new Error('error parsing controls');
  }
};


module.exports = loadControls();