var _ = require('lodash');
var inspector = require('schema-inspector');
var controls = require('./command-config');

var controlSchema = {
  type: 'object',
  properties: {
    type: {type: 'string'},
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


module.exports = function() {
  if (validateControls(controls)) {
    return controls;
  } else {
    throw new Error('error parsing controls');
  }
}();