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
//let OrbitControls = require('three-orbit-controls')(THREE)
let ViewportStore = require('../stores/viewport-store')
let ViewportActions = require('../actions/viewport-actions')
let ApplicationStore = require('../stores/application-store')
import BaseComponent from './base-component.react'
//import OrbitalCamera from '../scene_objects/orbital-camera.react'

class Viewport extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentInteractiveCommand: false,
      height: 600,
      width: 600,
      sceneObjects: ViewportStore.getSceneObjects(),
      orbitControlSettings: {
        enableRotate: true,
        enablePan: true,
        enableZoom: true
      }
    }
    //this.orbitControls = OrbitControls
  }

  componentDidMount() {
    let self = this

    this.setState({
      width: this.viewportRef.offsetWidth,
      height: this.viewportRef.offsetHeight
    })

    ViewportStore.addChangeListener(() => {
      this.setState(ViewportStore.getSceneObjects())
    })

    ApplicationStore.addChangeListener(() => {
      self.setState({
        currentInteractiveCommand: ApplicationStore.getCurrentInteractiveCommand()
      })

      //if (self.state.currentInteractiveCommand) {
      //  self.setState({
      //    orbitControlSettings: {
      //      enableRotate: false,
      //      enablePan: false,
      //      enableZoom: false
      //    }
      //  })
      //} else {
      //  self.setState({
      //    orbitControlSettings: {
      //      enableRotate: true,
      //      enablePan: true,
      //      enableZoom: true
      //    }
      //  })
      //}
    })

    window.addEventListener('resize', () => {
      this.setState({
        width: this.viewportRef.offsetWidth,
        height: this.viewportRef.offsetHeight
      })
    })

  }

  componentWillUnmount() {
    ViewportStore.removeChangeListener(this.onChange)
    window.removeEventListener('resize', this.resize);
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
      fov : 75, aspect : 1,
      near : 1, far : 5000,
      position : new THREE.Vector3(0,0,6),
      lookat : new THREE.Vector3(0,0,0)
    }
    return (
      <div className="viewport" ref={ (ref) => this.viewportRef = ref }>
          <Scene width={this.state.width} height={this.state.height}
                 camera="maincamera">
            <PerspectiveCamera name="maincamera" {...cameraProps} />
            {this.sceneGeometry()}
            <PointLight color={0xffffff} position={lightPosition} intensity={3.0} />
            <AmbientLight color={0x333333} />
          </Scene>
      </div>
    )
  }

  onChange() {
    this.setState(ViewportStore.getSceneObjects())
  }
}


function handleClick(event) {
  createCube(event)
}


function createCube(event) {
  ViewportActions.createObject({
    objectData: {
      position: new THREE.Vector3(Math.random() * 5,
                                  Math.random() * 5,
                                  Math.random() * 5),
      material: new THREE.MeshLambertMaterial({color: 0x0000ff}),
      geometry: new THREE.BoxGeometry( 1, 1, 1 )
    }
  })
}

//module.exports = Viewport

export default BaseComponent(Viewport)