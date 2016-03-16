let React = require('react')
let ReactTHREE = require('react-three')
let THREE = require('three')
let Mesh = ReactTHREE.Mesh
let ViewportActions = require('../actions/viewport-actions')
let ApplicationActions = require('../actions/application-actions')
let ApplicationStore = require('../stores/application-store')

class GroundPlane extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let myHandleClick = (event, intersection) => {
      event.stopPropagation()
      ApplicationActions.click({
        targetID: this.props.id,
        viewport: true,   // need a better identification system
        intersection: intersection
      })

    }

    return(
      <Mesh position={new THREE.Vector3(0, -2, 0)}
            material={new THREE.MeshLambertMaterial( { color: 0x6666ff } )}
            geometry={new THREE.BoxGeometry(200, 0.5, 200)}
            receiveShadow={true}
            onMouseDown3D={myHandleClick}
      />
    )
  }
}

export default GroundPlane