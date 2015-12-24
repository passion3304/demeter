var q = require('q');
var commands = require('./commands');
var components = require('../components/component-index');
var uuid = require('node-uuid');
var _ = require('lodash');


var ui = {

  commands: [],
  components: [],
  elements: [],

  initialize: function(settings) {

    var deferred = q.defer();

    initializeCommands(commands);

    _.forEach(components, function(componentClass) {
      initializeComponent(componentClass);
      _.forEach(componentClass, function(component) {
        initializeElement(component);

        var initializeChildren = function(parent) {
          var hasChildren = typeof parent.children !== 'undefined';
          if (!hasChildren) {
            return;
          } else {
            _.forEach(parent.children, function(child) {
              initializeElement(child);
              initializeChildren(child);
            });
          }
        };

        initializeChildren(component);
      });
    });

    setTimeout(function() {     // terrible
      deferred.resolve();
    }, 1000);

    return deferred.promise;

  },

  registerElements: function(elements) {
    if (Array.isArray(elements)) {
      elements.map(function (element) {
        initializeElement(element);
      });
    }
  },

  getElements: function() {
    return this.elements;
  },

  getComponents: function() {
    return this.components;
  },

  getComponentByID: function(id) {
    return findByID(this.components, id);
  },

  getElementByID: function(id) {
    return findByID(this.elements, id);
  },

  click: function(targetID) {
    var element = findByID(this.elements, targetID);
    if (element && typeof element.command !== 'undefined') {

      var command = findByName(this.commands, element.command);

      switch (command.type) {
        case 'interactive':

          toggleActiveState(element);

          break;

        case 'boolean':
          toggleActiveState(element);
          break;

        case 'instant':
          activate(element);
          setTimeout(function() {
            deactivate(element);
          }, 333);
          // execute command
          break;

        default:
          // no op
      }
    }
  }
};




var findByID = function(collection, id) {
  return _.find(collection, { id : id });
};

var findByName = function(collection, name) {
  return _.find(collection, { name : name });
};

var findDependentsByCommand = function(element) {
  if (typeof element.command === 'undefined') {
    return false;
  } else {
    var command = findByName(ui.commands, element.command);
    return _.filter(ui.elements, function(element) {
      if (element.hasOwnProperty('parentCommand')) {
        return element.parentCommand === command.name;
      }
    });
  }
};

var initializeCommands = function(allCommands) {
  ui.commands = allCommands;

  _.forEach(ui.commands, function(command) {
    var commandDefaults = {
      id: uuid.v1()
    };
    _.defaults(command, commandDefaults);
  });
};

var initializeComponent = function(componentClass) {
  var componentClassDefaults = {
    id: uuid.v1()
  };
  _.defaults(componentClass, componentClassDefaults);
  ui.components.push(componentClass);
};

var initializeElement = function(element) {
  ui.elements.push(element);

  var elementDefaults = {
    id: uuid.v1(),
    visible: true,
    active: false
  };

  _.defaults(element, elementDefaults);
};

var activate = function(element) {
  var otherElements = _.reject(ui.elements, { id: element.id });
  var command = findByName(ui.commands, element.command);

  _.forEach(otherElements, function(otherElement) {

    if (command && otherElement.hasOwnProperty('command')) {
      var otherCommand = findByName(ui.commands, otherElement.command);

      // only one interactive command at a time
      if (command.type === 'interactive' && otherCommand.type === 'interactive'
            && otherElement.active) {
        deactivate(otherElement);
      }
    }
  });

  element.active = true;

  _.forEach(findDependentsByCommand(element), function(dependent) {
    dependent.active = true;
  });

  var otherElementsWithSameCommand = _.find(otherElements, { command: element.command });
  if (Array.isArray(otherElementsWithSameCommand)) {
    _.forEach(otherElementsWithSameCommand, function(otherElement) {
      otherElement.active = true;
    });
  } else if (typeof otherElementsWithSameCommand !== 'undefined') {
    otherElementsWithSameCommand.active = true;
  } else {
    return;
  }
};

var deactivate = function(element) {
  var otherElements = _.reject(ui.elements, { id: element.id });
  var command = findByName(ui.commands, element.command);

  element.active = false;

  _.forEach(findDependentsByCommand(element), function(dependent) {
    deactivate(dependent);
  });

  var otherElementsWithSameCommand = _.find(otherElements, { command: element.command });
  if (command && Array.isArray(otherElementsWithSameCommand)) {
    _.forEach(otherElementsWithSameCommand, function(otherElement) {
      otherElement.active = false;
    });
  } else if (otherElementsWithSameCommand) {
    otherElementsWithSameCommand.active = false;
  } else {
    return;
  }
};

var toggleActiveState = function(element) {
  //element.active = !element.active;

  if (!element.active) {
    activate(element);
  } else {
    deactivate(element);
  }
};

module.exports = ui;