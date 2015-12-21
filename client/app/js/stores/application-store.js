var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var ApplicationConstants = require('../constants/application-constants');
var SettingsStore = require('./settings-store');
var ui = require('./ui');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var ApplicationStore = assign({}, EventEmitter.prototype, {
  state: {
    settings: {},
    loaded: false
  },

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

        AppDispatcher.waitFor([
          SettingsStore.dispatchToken
        ]);

        // register change listener for settings here?  also ui-store?

        //SettingsStore.getSettings()
        //  .then(function(data) {
        //    self.state.settings = data;
        //    self.state.loaded = true;
        //    ui.initialize(self.state.settings);
        //    ApplicationStore.emitChange();
        //  });

        ApplicationStore.state.settings = SettingsStore.getSettings();
        ApplicationStore.state.loaded = true;
        ui.initialize(ApplicationStore.state.settings)
          .then(function () {
            ApplicationStore.emitChange();
          });

        break;
      case ApplicationConstants.REGISTER_ELEMENTS:
        ui.registerElements(action.elements);
        break;
      case ApplicationConstants.CLICK:
        ui.click(action.targetID);
        break;
      default:
      //no op
    }

    return true;
  }),

  appLoaded: function () {
    return this.state.loaded;
  },

  getComponents: function () {
    return ui.getComponents();
  },

  getComponentByID(id) {
    return ui.getComponentByID(id);
  },

  getElements: function () {
    return ui.getElements();
  },

  getElementByID: function (id) {
    return ui.getElementByID(id);
  }

});


module.exports = ApplicationStore;