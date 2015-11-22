var _ = require('lodash');
var inspector = require('schema-inspector');
var optionPanels = require('./option-panel-config');

var optionPanelsSchema = {
  type: 'object',
  properties: {
    name: {type: 'string'},
    locations: {type: 'array'}
  }
};

var validateOptionPanels = function(optionPanelsToValidate) {

  var invalidOptionPanels = [];

  _.forEach(optionPanelsToValidate, function(optionPanel) {
    if (!inspector.validate(optionPanelsSchema, optionPanel).valid) {
      invalidOptionPanels.push(optionPanel);
    }
  });

  return invalidOptionPanels.length <= 0;
};


module.exports = function() {
  if (validateOptionPanels(optionPanels)) {
    return optionPanels;
  } else {
    throw new Error('error parsing option panels');
  }
}();