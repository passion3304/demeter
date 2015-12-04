var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var ApplicationConstants = require('../constants/application-constants');
var SettingsStore = require('./settings-store');
var uiStore = require('./ui-store');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var appState = {
  settings: {},
  loaded: false
};

var ApplicationStore = assign({}, EventEmitter.prototype, {

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
      case ApplicationConstants.START_APP:

        AppDispatcher.waitFor([
          SettingsStore.dispatchToken,
          uiStore.dispatchToken
        ]);

        // register change listener for settings here?  also ui-store?

        SettingsStore.getSettings()
          .then(function(data) {
            appState.settings = data;
          })
          .then(function() {
            appState.loaded = true;
            uiStore.initialize(appState.settings);
            this.emitChange();
          });


        break;
      case ApplicationConstants.CLICK:
        uiStore.click(action.targetID);
        break;
      default:
        //no op
    }
  }),

  appLoaded: function() {
    return appState.loaded;
  }
});


module.exports = ApplicationStore;