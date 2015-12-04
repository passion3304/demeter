var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
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
    uiState.commands = settings.commands;

    _.forEach(uiState.ui.components, function(componentClass) {
      uiState.components.push(componentClass);
      _.forEach(componentClass, function(component) {
        uiState.elements.push(component);
        if (typeof component.children !== 'undefined') {
          _.forEach(component.children, function(child) {
            uiState.elements.push(child);
            if (typeof child.children !== 'undefined') {
              _.forEach(child.children, function(subChild) {
                uiState.elements.push(subChild);
              });
            }
          });
        }
      });
    });

    var elementDefaults = {
      visible: true,
      active: false,
      optionsPanel: false
    };

    _.forEach(uiState.elements, function(element) {
      _.defaults(element, elementDefaults);
    });

    var commandDefaults = {
      optionPanel: false
    };

    _.forEach(uiState.commands, function(command) {
      _.defaults(command, commandDefaults);
    });

    this.emitChange();
  },

  getElements: function() {
    return uiState.elements;
  },

  getComponents: function() {
    return uiState.components;
  },

  getComponentByReactID: function(id) {
    return findByID(uiState.components, id);
  },

  click: function(targetID) {
    var element = findByID(uiState.elements, targetID);
    if (element && typeof element.command !== 'undefined') {
      var command = findByName(uiState.commands, element.command);
      switch (command.type) {
        case 'interactive':

          var otherElements = _.reject(uiState.elements, { id: targetID });
          _.forEach(otherElements, function(otherElement) {

            if (otherElement.hasOwnProperty('command')) {
              var otherCommand = findByName(uiState.commands, otherElement.command);
              if (otherCommand.type === 'interactive' && otherElement.active) {
                otherElement.active = false;
                deactivate(otherElement);
              }
            }
          });

          element.active = !element.active;

          if (element.active) {
            activate(element);

            var otherElementsWithSameCommand = _.find(otherElements, { command: element.command });
            _.forEach(otherElementsWithSameCommand, function(otherElement) {
              otherElement.active;
            });

          } else {
            deactivate(element);
          }

          uiStore.emitChange();
          break;

        case 'boolean':
          element.active = !element.active;
          if (element.active) {
            activate(element);
          } else {
            deactivate(element);
          }
          uiStore.emitChange();
          break;

        case 'instant':
          element.active = true;
          uiStore.emitChange();
          setTimeout(function() {
            element.active = false;
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

var activate = function(element) {
  _.forEach(findDependentsByCommand(element), function(dependent) {
    dependent.active = true;
  });
};

var deactivate = function(element) {
  _.forEach(findDependentsByCommand(element), function(dependent) {
    dependent.active = false;
  });
};

module.exports = uiStore;