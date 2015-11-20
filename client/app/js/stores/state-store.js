var _ = require('lodash');
var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var StateConstants = require('../constants/state-constants');
var assign = require('object-assign');

var controls = require('../ui-modules/controls/controls');

var CHANGE_EVENT = 'change';

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

  getToolbarControls: function() {

    // pull out just the controls that are meant for the toolbar
    return _.filter(controls, function(control) {
      return _.some(control.locations, 'name', 'toolbar');
    });
  }
});

AppDispatcher.register(function(action) {
  switch (action.actionType) {
    case StateConstants.TOOLBAR_SELECTION_CHANGED:

      var controlClicked = _.find(controls, { 'id' : action.id });

      switch (controlClicked.type) {
        case 'command':
          return;
        case 'boolean':
          controlClicked.active = !controlClicked.active;
          break;
        case 'modal':
          if (controlClicked.active) {
            return;
          } else {
            controlClicked.active = !controlClicked.active;

            // deselect other modal controls
            _.forEach( _.reject(controls, { 'id' : action.id }), function(otherControl) {
              if (otherControl.type === 'modal' && otherControl.active) {
                otherControl.active = false;
              }
            });
          }
          break;
        default:
          // no op
      }

      StateStore.emitChange();
      break;

    default:
    // no op
  }
});

module.exports = StateStore;