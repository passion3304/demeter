let React = require('react')
let ReactTHREE = require('react-three')
let PerspectiveCamera = ReactTHREE.PerspectiveCamera
let THREE = require('three')
let TrackballControls = require('three.trackball')

class TrackballCamera extends React.Component {
  constructor(props) {
    super(props)
    this.cameraProps = { fov: 75, aspect: this.props.aspect, near: 0.1, far: 1000,
      position: new THREE.Vector3(0, 2, 6), lookat: new THREE.Vector3(0, 0, 0),
      name: 'maincamera'}
    this.camera = React.createElement(PerspectiveCamera, this.cameraProps)
    this.THREECamera = false
    this.cameraControls = false
    this.viewportRef = false
  }

  componentDidMount() {
    //hacky way to get the camera
    this.THREECamera = this.camera._owner._renderedComponent._THREEObject3D
  }

  componentDidUpdate() {
    //this.viewportRef = this.props.viewportRef.getDOMNode()
  }

  componentWillReceiveProps() {
    //this.viewportRef = this.props.viewportRef.getDOMNode()
  }

  render() {

    if (this.THREECamera && this.props.viewportRef) {
      this.viewportRef = this.props.viewportRef
      this.cameraControls = TrackballControls(this.THREECamera, this.viewportRef)
    }

    let MyCamera = this.camera

    return MyCamera
  }
}

export default TrackballCamera