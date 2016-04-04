/**
 * Huge hack because why can't we get projection and other 3D information back from the camera
 *
 * or even just tie that to an event that (would be nice) if react-three kicked out
 *
 * @type {*|exports|module.exports}
 */

let React = require('react')
let ReactTHREE = require('react-three')
let THREE = require('three')
let Mesh = ReactTHREE.Mesh
let ViewportActions = require('../actions/viewport-actions')
let ApplicationActions = require('../actions/application-actions')
let ApplicationStore = require('../stores/application-store')

class MouseInteractionPlane extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let handleClick = (event, intersection) => {
      event.stopPropagation()
      if (event.metaKey) {
        return
      } else {
        ApplicationActions.click({
          targetID: this.props.id,
          viewport: true,   // need a better identification system
          intersection: intersection
        })
      }
    }

    return(
      <Mesh position={new THREE.Vector3(0, 0, 0)}
            material={new THREE.MeshLambertMaterial( { color: 0xffffff } )}
            geometry={new THREE.BoxGeometry(10, 10, 0)}
            receiveShadow={true}
            onMouseDown3D={handleClick} />
    )
  }
}

export default MouseInteractionPlane