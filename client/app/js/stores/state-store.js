var _ = require('lodash');
var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var ApplicationConstants = require('../constants/application-constants');
var StateConstants = require('../constants/state-constants');
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

var StateStore = Object.assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});



module.exports = StateStore;