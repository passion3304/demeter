let React = require('react')
//let ReactTHREE = require('../lib/react-three/es5/react-three-commonjs')
let ReactTHREE = require('react-three')
let THREE = require('three')
let Renderer = ReactTHREE.Renderer
let Scene = ReactTHREE.Scene
let PerspectiveCamera = ReactTHREE.PerspectiveCamera
let Mesh = ReactTHREE.Mesh
let AmbientLight = ReactTHREE.AmbientLight
let PointLight = ReactTHREE.PointLight
let OrbitControls = require('three-orbit-controls')(THREE)
let ViewportStore = require('../stores/viewport-store')
let ApplicationStore = require('../stores/application-store')
import OrbitalCamera from '../scene_objects/orbital-camera.react'
import GroundPlane from '../scene_objects/ground-plane.react'
import BaseComponent from './base-component.react'
//import OrbitalCamera from '../scene_objects/orbital-camera.react'

class Viewport extends React.Component {

  constructor(props) {
    super(props)
    let initialCameraPosition = new THREE.Vector3(0,0,3)
    this.state = {
      currentInteractiveCommand: ApplicationStore.getCurrentInteractiveCommand(),
      height: 600,
      width: 600,
      sceneObjects: ViewportStore.getSceneObjects(),
      cameraPosition: initialCameraPosition
    }
    this.orbitControls = OrbitControls
  }

  componentDidMount() {
    let self = this

    this.setState({
      width: this.viewportRef.offsetWidth,
      height: this.viewportRef.offsetHeight
    })

    ViewportStore.addChangeListener(() => {
      this.setState({
        sceneObjects: ViewportStore.getSceneObjects()
      })
    })

    //ApplicationStore.addChangeListener(this.onChange)

    window.addEventListener('resize', () => {
      this.setState({
        width: this.viewportRef.offsetWidth,
        height: this.viewportRef.offsetHeight
      })
    })

  }

  componentWillUpdate() {
    //this.setState({
    //  cameraPosition: {}
    //})
  }

  componentWillUnmount() {
    //ViewportStore.removeChangeListener(this.onChange)
    //ApplicationStore.removeChangeListener(this.onChange)
    window.removeEventListener('resize', this.resize)
  }


  resize() {
    if (typeof this.viewportRef !== 'undefined') {
      this.setState({
        width: this.viewportRef.offsetWidth,
        height: this.viewportRef.offsetHeight
      })
    }
  }

  sceneGeometry() {
    return this.state.sceneObjects.map((object, i) => {
      return (
        <Mesh position={object.position}
              material={object.material}
              geometry={object.geometry}
              key={i} />
      )
    })
  }


  render() {

    let lightPosition = new THREE.Vector3(-3, 3, -3)
    let cameraProps = {
      fov : 75, aspect: this.state.width / this.state.height,
      near : 1, far : 5000,
      position : this.state.cameraPosition,
      lookat : new THREE.Vector3(0,0,0)
    }
    let myCameraPosition = new THREE.Vector3(0,1,10)
    return (
      <div className="viewport" ref={ (ref) => this.viewportRef = ref }>
        <Renderer lockCamera={shouldCameraLock()} width={this.state.width} height={this.state.height} background={0x3366ff}>
          <Scene
                 width={this.state.width} height={this.state.height}
                 camera="maincamera"
                 myCameraPosition={myCameraPosition}
                 orbitControls={OrbitControls}
                 pointerEvents={['onMouseDown', 'onMouseMove']}
                 >
            <OrbitalCamera name="maincamera" {...cameraProps} />
            {this.sceneGeometry()}
            <PointLight color={0xffffff} position={lightPosition} intensity={3.0} />
            <AmbientLight color={0x333333} />
            <GroundPlane
              /*clickToCreate={this.state.currentInteractiveCommand === 'plant'}*/
           />
          </Scene>
        </Renderer>
      </div>
    )
  }


}

function shouldCameraLock() {
  let currentInteractiveCommand = ApplicationStore.getCurrentInteractiveCommand();
  if (currentInteractiveCommand) {
    return true
  } else {
    return false
  }
}

export default BaseComponent(Viewport)