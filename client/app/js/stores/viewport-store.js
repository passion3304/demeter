let AppDispatcher = require('../dispatcher/app-dispatcher')
let EventEmitter = require('events').EventEmitter
let THREE = require('three')
let ApplicationConstants = require('../constants/application-constants')
let ViewportConstants = require('../constants/viewport-constants')


let CHANGE_EVENT = 'change'

let ViewportStore = Object.assign({}, EventEmitter.prototype, {
  state: {
    scene: {
      name: 'my-scene',
      objects: [
        {
          geometry: new THREE.BoxGeometry( 1, 1, 1 ),
          material: new THREE.MeshLambertMaterial( { color: 0x8ead86 } ),
          position: new THREE.Vector3(-3,1,0)
        }
      ],
      cameraData: {
        position: {},
        rotation: {},
        scale: {}
      }
    }
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

  getCameraData: function() {
    return this.state.cameraData
  }
})

function loadScene(scene) {
  return scene
}

let createObject = (objectData) => {
  ViewportStore.state.scene.objects.push(objectData)
  ViewportStore.emitChange()
}

function saveCameraData(cameraData) {
  ViewportStore.state.cameraData = cameraData
}



module.exports = ViewportStore