var inspector = require('schema-inspector');


//var controlSchema = {
//  type: 'object',
//  properties: {
//    name: {type: 'string'},
//    location: {type: 'array'},
//    icon: {type: 'string'}
//  }
//};
//
//var validControlObjects = inspector.validate(controlSchema, allControls[0]);
//
//console.log(validControlObjects);

//var Controls = function() {
//  return allControls;
//};

var validateControls = function(controlsToValidate) {
  return true;
};

var loadControls = function() {
  var validated = validateControls(controls);
  return controls;
};

var controls = [
  {
    "name": "Create plant",
    "icon": "fa-plus",
    "locations": [
      {
        "name": "toolbar",
        "path": "primary"
      }
    ]
  },
  {
    "name": "Erase",
    "icon": "fa-minus",
    "locations": [
      {
        "name": "toolbar",
        "path": "primary"
      }
    ]
  },
  {
    "name": "Magent",
    "icon": "fa-magnet",
    "locations": [
      {
        "name": "toolbar",
        "path": "primary"
      }
    ]
  }
];

module.exports = loadControls();