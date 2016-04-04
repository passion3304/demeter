const THREE = require('three')
const ViewportActions = require('../actions/viewport-actions')

var primitiveCommand = function() {
  return {
    activate: function() {

    },

    deactivate: function() {

    },

    handleClick: function(action) {
      setTimeout(() => {    // terrible, terrible hack
        ViewportActions.createObject({
          objectData: {
            position: new THREE.Vector3(action.intersection.point.x,
                                        action.intersection.point.y,
                                        action.intersection.point.z),
            material: new THREE.MeshBasicMaterial({color: 0x880000, wireframe: true}),
            geometry: new THREE.BoxGeometry( 1, 1, 1 ),
            type: 'guide'
          }
        })
      }, 1)

    }
  }
};

module.exports = primitiveCommand();