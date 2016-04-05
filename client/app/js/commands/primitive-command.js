const THREE = require('three')
const ViewportActions = require('../actions/viewport-actions')
let ApplicationStore = require('../stores/application-store')

var primitiveCommand = function() {
  return {
    activate: function() {

    },

    deactivate: function() {

    },

    handleClick: function(action) {



      if (/* === 'guide' && typeof action.objectData.shape !== 'undefined'*/true) {
        switch(action.shape) {
          case 'box':
            objectData = {
              position: new THREE.Vector3(action.intersection.point.x,
                                          action.intersection.point.y,
                                          action.intersection.point.z),
              material: new THREE.MeshBasicMaterial({color: 0x880000, wireframe: true}),
              geometry: new THREE.BoxGeometry( 1, 1, 1 ),
              type: 'guide'
            }
            break
          case 'sphere':
            break
          case 'cone':
            break
          default:
            // no op
        }
      }


      setTimeout(() => {    // terrible, terrible hack
        let primitiveSettings = ApplicationStore.getCommandSettings('primitive')

        let objectData = {
          position: new THREE.Vector3(action.intersection.point.x,
            action.intersection.point.y,
            action.intersection.point.z),
          material: new THREE.MeshBasicMaterial({color: 0x880000, wireframe: true}),
          geometry: new THREE.BoxGeometry( 1, 1, 1 ),
          type: 'guide'
        }

        ViewportActions.createObject({
          objectData: objectData
        })
      }, 1)

    }
  }
};

module.exports = primitiveCommand();