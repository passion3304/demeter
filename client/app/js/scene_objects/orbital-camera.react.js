let React = require('react')
let ReactTHREE = require('../lib/react-three/es5/react-three-commonjs')
let PerspectiveCamera = ReactTHREE.PerspectiveCamera
let THREE = require('three')
let TrackballControls = require('three.trackball')
let ApplicationStore = require('../stores/application-store')

class OrbitalCamera extends React.Component {
  constructor(props) {
    super(props)
  }

  //componentDidMount() {
  //  ApplicationStore.addChangeListener(() => {
  //  })
  //}
  //
  //componentWillReceiveProps(oldProps) {
  //  //console.log(this.props.position)
  //}

  render() {
    let aspectRatio = this.props.width / this.props.height
    let cameraProps = {
      fov : 75, aspect : aspectRatio,
      near : 1, far : 5000,
      position : new THREE.Vector3(0,0,600),
      lookat : new THREE.Vector3(0,0,0)
    }
    return (
      <PerspectiveCamera {...cameraProps} />
    )
  }
}

export default OrbitalCamera