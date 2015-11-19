var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var MessageConstants = require('../constants/viewport-constants');
var assign = require('object-assign');
var controls = require('../components/controls');

var CHANGE_EVENT = 'change';

var ControlsStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return controls;
  },

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

var loadControls = function() {
  return controls;
};

module.exports = ControlsStore;