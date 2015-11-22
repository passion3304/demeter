var _ = require('lodash');
var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var ApplicationConstants = require('../constants/application-constants');
var StateConstants = require('../constants/state-constants');
var assign = require('object-assign');
var commands = require('../ui-modules/commands/commands');
var optionPanels = require('../ui-modules/option-panels/option-panels');


/**
 *    globals
 */

var appState = {
  selectedInteractiveCommand: null,
  selectedBooleanCommands: [],
  activeOptionsPanel: false
};

var uiModules = [];

var CHANGE_EVENT = 'change';


/**
 *    public API
 */

var StateStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getToolbarCommands: function() {
    return _getToolbarCommands();
  }
});

/**
 *    one big switch statement with a case for each listener
 */

AppDispatcher.register(function(action) {
  switch (action.actionType) {
    case StateConstants.SELECT_CONTROL:
      _selectCommand(action.command);
      StateStore.emitChange();
      break;

    default:
    // no op
  }
});


/**
 *      private functions for public API
 */

var _getToolbarCommands = function() {
  return _.filter(commands, function(command) {
    return _.some(command.locations, 'name', 'toolbar');
  });

};


/**
 *      dispatcher functions
 */

var _appStart = function() {
  _.forEach(commands, function(command) {
    uiModules.push(command);
  });
  _.forEach(optionPanels, function(optionPanel) {
    uiModules.push(optionPanel);
  });
};


var _selectCommand = function(command) {
  switch (command.type) {
    case 'command':
      return;

    case 'boolean':
      if (command.active) {
        command.deactivate();
        _deactivateChildren(command);
      } else {
        command.activate();
        _activateChildren(command);
      }
      break;

    case 'interactive':


      if (command.active) {
        return;
      } else {
        if (appState.selectedInteractiveCommand !== null) {
          appState.selectedInteractiveCommand.deactivate();
          _deactivateChildren(appState.selectedInteractiveCommand);
        }
        appState.selectedInteractiveCommand = command;
        command.activate();
        _activateChildren(command);
      }
      break;
    default:
    // no op
  }
};


var _activateChildren = function(parentModule) {
  _.forEach( uiModules, function(module) {
    _.forEach( module.locations, function(location) {
      _.forEach( parentModule.children, function(child) {
        if (child.path === location.path) {
          module.activate();
        }
      });
    });
  });
};


var _deactivateChildren = function(parentModule) {
  _.forEach( uiModules, function(module) {
    _.forEach( module.locations, function(location) {
      _.forEach( parentModule.children, function(child) {
        if (child.path === location.path) {
          module.deactivate();
        }
      });
    });
  });
};



module.exports = StateStore;