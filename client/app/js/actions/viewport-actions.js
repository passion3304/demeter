var AppDispatcher = require('../dispatcher/app-dispatcher')
var ViewportConstants = require('../constants/viewport-constants')

var ViewportActions = {

  createObject: function(data) {
    AppDispatcher.dispatch({
      actionType: ViewportConstants.CREATE_OBJECT,
      objectData: data.objectData
    })
  },

  setTime: function(data) {
    AppDispatcher.dispatch({
      actionType: ViewportConstants.SET_TIME,
      time: data.time
    })
  },

  setDate: function(data) {
    AppDispatcher.dispatch({
      actionType: ViewportConstants.SET_DATE,
      date: data.date
    })
  },

  setLatitude: function(data) {
    AppDispatcher.dispatch({
      actionType: ViewportConstants.SET_LATITUDE,
      latitude: data.latitude
    })
  },

  setLongitude: function(data) {
    AppDispatcher.dispatch({
      actionType: ViewportConstants.SET_LONGITUDE,
      longitude: data.longitude
    })
  },

  saveCameraData: function(data) {
    AppDispatcher.dispatch({
      actionType: ViewportConstants.SAVE_CAMERA_DATA,
      cameraData: data.cameraData
    })
  }
}

module.exports = ViewportActions