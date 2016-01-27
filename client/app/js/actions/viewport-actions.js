var AppDispatcher = require('../dispatcher/app-dispatcher')
var ViewportConstants = require('../constants/viewport-constants')

var ViewportActions = {

  createObject: function(data) {
    AppDispatcher.dispatch({
      actionType: ViewportConstants.CREATE_OBJECT,
      objectData: data.objectData
    })
  }
}

module.exports = ViewportActions