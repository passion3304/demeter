let AppDispatcher = require('../dispatcher/app-dispatcher')
let EventEmitter = require('events').EventEmitter
let _ = require('lodash')
let uuid = require('node-uuid')
let THREE = require('three')
let ApplicationConstants = require('../constants/application-constants')
let ApplicationActions = require('../actions/application-actions')
let ViewportConstants = require('../constants/viewport-constants')
let Validate = require('../lib/validate')


let CHANGE_EVENT = 'change'

let ViewportStore = Object.assign({}, EventEmitter.prototype, {
  state: {
    scene: {
      name: 'my-scene',
      objects: [],

      cameraData: {
        position: {},
        rotation: {},
        scale: {}
      }
    },
    guideObject: false,
    time: {
      hour: 11,
      minute: 30
    },
    date: {
      date: 10,
      month: 11,
      year: 2016
    },
    latitude: 45,
    longitude: -122
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  dispatchToken: AppDispatcher.register(function(action) {
    switch (action.actionType) {
      case ViewportConstants.CREATE_OBJECT:
        createObject(action.objectData)
        break
      case ViewportConstants.DESTROY_OBJECT:
        destroyObject(action.id)
        break
      case ViewportConstants.SET_TIME:
        setTime(action.time)
        break
      case ViewportConstants.SET_DATE:
        setDate(action.date)
        break
      case ViewportConstants.SET_LATITUDE:
        setLatitude(action.latitude)
        break
      case ViewportConstants.SET_LONGITUDE:
        setLongitude(action.longitude)
        break
      case ViewportConstants.SAVE_CAMERA_DATA:
        saveCameraData(action.cameraData)
      default:
      //no op
    }

    return true
  }),

  getSceneObjects: function() {
    return this.state.scene.objects
  },

  getGuideObject: function() {
    return this.state.guideObject
  },

  getCurrentTime: function() {
    return this.state.time
  },

  getCurrentDate: function() {
    return this.state.date
  },

  getLatitude: function() {
    return this.state.latitude
  },

  getLongitude: function() {
    return this.state.longitude
  },

  getCameraData: function() {
    return this.state.cameraData
  }
})

function loadScene(scene) {
  return scene
}

let createObject = (objectData) => {      // seems like this should go in another module, perhaps a yet-to-be created
                                          // Scene store
  objectData.id = uuid.v1()
  objectData.handleClick = (event, intersection) => {
    ApplicationActions.click({
      targetID: objectData.id,
      viewport: true,
      intersection: intersection
    })
  }

  if (objectData.type === 'guide') {
    ViewportStore.state.guideObject = objectData
  } else {
    ViewportStore.state.scene.objects.push(objectData)
  }
  ViewportStore.emitChange()
}

let destroyObject = (id) => {
  _.remove(ViewportStore.state.scene.objects, { id: id })
  ViewportStore.emitChange()
}

function setTime(time) {
  Validate.time(time)
  ViewportStore.state.time = time
  ViewportStore.emitChange()
}

function setDate(date) {
  Validate.date(date)
  ViewportStore.state.date = date
  ViewportStore.emitChange()
}

function setLatitude(latitude) {
  Validate.latitude(latitude)
  ViewportStore.state.latitude = latitude
  ViewportStore.emitChange()
}

function setLongitude(longitude) {
  Validate.longitude(longitude)
  ViewportStore.state.longitude = longitude
  ViewportStore.emitChange()
}

function saveCameraData(cameraData) {
  ViewportStore.state.cameraData = cameraData
}



module.exports = ViewportStore