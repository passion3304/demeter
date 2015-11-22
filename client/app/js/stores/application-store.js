var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var ApplicationConstants = require('../constants/application-constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var ApplicationStore = assign({}, EventEmitter.prototype, {

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


AppDispatcher.register(function(action) {
  console.log('hello');
  switch (action.actionType) {
    case ApplicationConstants.APP_START:
      break;
    case ApplicationConstants.UI_CLICK:
      console.log('click');
      ApplicationStore.emitChange();
      break;

    default:
    // no op
  }
});

module.exports = ApplicationStore;