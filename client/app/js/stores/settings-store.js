var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var settings = require('./objects/settings');
var assign = require('object-assign');
var q = require('q');

var CHANGE_EVENT = 'change';

var SettingsStore = assign({}, EventEmitter.prototype, {

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

  getSettings: function() {
    var deferred = q.defer();



    setTimeout(function() {
      deferred.resolve(settings);
    }, 100);

    return deferred.promise;
  }
});

AppDispatcher.register(function(action) {
  switch (action.actionType) {
    case true:
      break;

    default:
    // no op
  }
});

module.exports = SettingsStore;