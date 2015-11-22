var AppDispatcher = require('../dispatcher/app-dispatcher');
var StateConstants = require('../constants/state-constants');

var StateActions = {

  selectControl: function(control) {
    AppDispatcher.dispatch({
      actionType: StateConstants.SELECT_CONTROL,
      control: control.control
    });
  }
};

module.exports = StateActions;