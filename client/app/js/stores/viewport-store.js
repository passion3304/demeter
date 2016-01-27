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
          position: new THREE.Vector3(2,1,-5)
        },
        {
          geometry: new THREE.BoxGeometry(40, 0, 40),
          material: new THREE.MeshLambertMaterial( { color: 0x5e3308 } ),
          position: new THREE.Vector3(0, -2, 0)
        }
      ]
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
        createObject(action.objectData, ViewportStore.state.scene.objects)
        break
      default:
      //no op
    }

    return true
  }),

  getSceneObjects: function() {
    return this.state.scene.objects
  }
})

function loadScene(scene) {
  return scene
}

function createObject(objectData, objects) {
  objects.push(objectData)
  ViewportStore.emitChange()
}

module.exports = ViewportStore