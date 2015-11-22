var AppDispatcher = require('../dispatcher/app-dispatcher');
var ApplicationConstants = require('../constants/application-constants');

var ApplicationActions = {

  appStart: function() {
    AppDispatcher.dispatch({
      actionType: ApplicationConstants.APP_START
    });
  },

  click: function(target) {
    AppDispatcher.dispatch({
      actionType: ApplicationConstants.UI_CLICK,
      uiTarget: target
    });
  }
};

module.exports = ApplicationActions;