var AppDispatcher = require('../dispatcher/app-dispatcher');
var StateConstants = require('../constants/state-constants');

var StateActions = {

  changeToolbarSelection: function(control) {
    AppDispatcher.dispatch({
      actionType: StateConstants.TOOLBAR_SELECTION_CHANGED,
      id: control.id
    });
  }
};

module.exports = StateActions;