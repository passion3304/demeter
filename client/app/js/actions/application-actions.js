var AppDispatcher = require('../dispatcher/app-dispatcher');
var ApplicationConstants = require('../constants/application-constants');

var ApplicationActions = {

  startApp: function(data) {
    AppDispatcher.dispatch({
      actionType: ApplicationConstants.START_APP
    });
  },

  registerElements(data) {
    AppDispatcher.dispatch({
      actionType: ApplicationConstants.REGISTER_ELEMENTS,
      elements: data.elements
    });
  },

  click: function(data) {
    AppDispatcher.dispatch({
      actionType: ApplicationConstants.CLICK,
      targetID: data.targetID
    });
  }
};

module.exports = ApplicationActions;