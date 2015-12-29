var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var ApplicationConstants = require('../constants/application-constants');
var SettingsStore = require('./settings-store');
import UI from './ui'
var assign = require('object-assign');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var ApplicationStore = assign({}, EventEmitter.prototype, {

  state: {
    settings: {},
    loaded: false,
    currentInteractiveCommand: {}
  },

  ui: {},

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatchToken: AppDispatcher.register(function (action) {

    switch (action.actionType) {
      case ApplicationConstants.START_APP:

        //AppDispatcher.waitFor([
        //  SettingsStore.dispatchToken
        //]);

        ApplicationStore.state.settings = SettingsStore.getSettings();
        ApplicationStore.state.loaded = true;
        ApplicationStore.ui = new UI(ApplicationStore.state.settings);
        ApplicationStore.emitChange();
        break;
      case ApplicationConstants.CLICK:
        ApplicationStore.ui.click(action.targetID)
          .then(function(newState) {
            _.assign(ApplicationStore.state, newState);
            ApplicationStore.emitChange();
          });
        break;
      default:
      //no op
    }

    return true;
  }),

  appLoaded: function () {
    return this.state.loaded;
  },

  getCurrentInteractiveCommand: function() {
    if (typeof this.state.currentInteractiveCommand.name !== 'undefined') {
      return this.state.currentInteractiveCommand.name;
    } else {
      return 'none';
    }
  }

});


module.exports = ApplicationStore;