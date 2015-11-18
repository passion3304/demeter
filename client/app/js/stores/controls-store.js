var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var MessageConstants = require('../constants/viewport-constants');
var assign = require('object-assign');
var Controls = require('../components/controls/controls');
var ControlsConstants = require('../constants/controls-constants');

var CHANGE_EVENT = 'change';

var ControlsStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return loadControls();
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
  return [
    {
      name: 'one',
      locations: [
        {
          name: ControlsConstants.TOOLBAR,
          path: 'primary'
        }
      ],
      icon: 'fa-plus'
    },
    {
      name: 'two',
      locations: [
        {
          name: ControlsConstants.TOOLBAR,
          path: 'primary'
        }
      ],
      icon: 'fa-minus'
    }
  ];
};

module.exports = ControlsStore;