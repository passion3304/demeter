const THREE = require('three')
const ViewportActions = require('../actions/viewport-actions')

var plantCommand = function() {
  return {
    activate: function() {
      
    },

    deactivate: function() {

    },

    handleClick: function(action) {
      setTimeout(() => {    // terrible, terrible hack
        ViewportActions.createObject({
          objectData: {
            position: new THREE.Vector3(action.intersection.point.x, 0, action.intersection.point.z),
            material: new THREE.MeshLambertMaterial({color: 0x0000ff}),
            geometry: new THREE.BoxGeometry( 1, 5, 1 )
          }
        })
      }, 1)
      
    }
  }
};

module.exports = plantCommand();