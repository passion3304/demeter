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

  createNewPlant(basePoint) {
    ViewportActions.createObject({
      objectData: {
        position: new THREE.Vector3(basePoint.x, 0, basePoint.z),
        material: new THREE.MeshLambertMaterial({color: 0x0000ff}),
        geometry: new THREE.BoxGeometry( 1, 5, 1 )
      }
    })
  }

  render() {
    let handleClick = (event, intersection) => {
      ApplicationActions.click({
        targetID: this.props.id,
        viewport: true,   // need a better identification system
        intersection: intersection
      })

      // if (ApplicationStore.getCurrentInteractiveCommand() && !this.props.metaKey) {
      //   this.createNewPlant(intersection.point)
      // }

    }

    return(
      <Mesh position={new THREE.Vector3(0, -2, 0)}
            material={new THREE.MeshLambertMaterial( { color: 0x6666ff } )}
            geometry={new THREE.BoxGeometry(200, 0.5, 200)}
            receiveShadow={true}
            onMouseDown3D={handleClick}
      />
    )
  }
}

export default GroundPlane