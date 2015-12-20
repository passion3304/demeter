var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var uuid = require('node-uuid');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var uiState = {
  commands: [],
  ui: {},
  components: [],
  elements: []
};


var uiStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatchToken: AppDispatcher.register(function(action) {
    switch (action.actionType) {
      case true:
        break;

      default:
      // no op
    }
  }),

  initialize: function(settings) {

    uiState.ui = settings.ui;
    initializeCommands(settings.commands);

    _.forEach(uiState.ui.components, function(componentClass) {
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

    this.emitChange();
  },

  registerElements: function(elements) {
    if (Array.isArray(elements)) {
      elements.map(function (element) {
        initializeElement(element);
      });
    }
  },

  getElements: function() {
    return uiState.elements;
  },

  getComponents: function() {
    return uiState.components;
  },

  getComponentByID: function(id) {
    return findByID(uiState.components, id);
  },

  getElementByID: function(id) {
    return findByID(uiState.elements, id);
  },

  click: function(targetID) {
    var element = findByID(uiState.elements, targetID);
    if (element && typeof element.command !== 'undefined') {

      var command = findByName(uiState.commands, element.command);

      switch (command.type) {
        case 'interactive':

          toggleActiveState(element);

          uiStore.emitChange();
          break;

        case 'boolean':
          toggleActiveState(element);
          if (element.active) {
            activate(element);
          } else {
            deactivate(element);
          }
          uiStore.emitChange();
          break;

        case 'instant':
          activate(element);
          uiStore.emitChange();
          setTimeout(function() {
            deactivate(element);
            uiStore.emitChange();
          }, 333);
          // execute command
          break;

        default:
          // no op
      }
    }
  }
});




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
    var command = findByName(uiState.commands, element.command);
    if (command.optionPanel) {
      return _.filter(uiState.elements, function(element) {
        if (element.hasOwnProperty('parentCommand')) {
          return element.parentCommand === command.name;
        }
      });
    } else {
      return false;
    }
  }
};

var initializeCommands = function(commands) {
  uiState.commands = commands;

  _.forEach(uiState.commands, function(command) {
    var commandDefaults = {
      id: uuid.v1(),
      optionPanel: false
    };
    _.defaults(command, commandDefaults);
  });
};

var initializeComponent = function(componentClass) {
  var componentClassDefaults = {
    id: uuid.v1()
  };
  _.defaults(componentClass, componentClassDefaults);
  uiState.components.push(componentClass);
};

var initializeElement = function(element) {
  uiState.elements.push(element);

  var elementDefaults = {
    id: uuid.v1(),
    visible: true,
    active: false,
    optionsPanel: false
  };

  _.defaults(element, elementDefaults);
};

var activate = function(element) {
  var otherElements = _.reject(uiState.elements, { id: element.id });
  var command = findByName(uiState.commands, element.command);

  _.forEach(otherElements, function(otherElement) {

    if (command && otherElement.hasOwnProperty('command')) {
      var otherCommand = findByName(uiState.commands, otherElement.command);

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
  var otherElements = _.reject(uiState.elements, { id: element.id });
  var command = findByName(uiState.commands, element.command);

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
  element.active = !element.active;

  if (element.active) {
    activate(element);
  } else {
    deactivate(element);
  }
};

module.exports = uiStore;