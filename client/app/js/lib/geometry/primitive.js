'use strict'

let THREE = require('three')
let ViewportActions = require('../../actions/viewport-actions')
let Validate = require('../validate')
let _ = require('lodash')

let Primitive = ( function() {
  return {
    createBox: function( center,
                         width, height, depth,
                         widthSegments, heightSegments, depthSegments,
                         material) {

      let box = THREE.BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)

      ViewportActions.createObject({
        position: center,
        geometry: box,
        material: material
      })

    }
  }
} )()

module.exports = Primitive