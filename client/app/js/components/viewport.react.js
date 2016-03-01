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
let DirectionalLight = ReactTHREE.DirectionalLight
import Sky from '../scene_objects/sky.react'
import Sun from '../scene_objects/sun.react'
import BaseComponent from './base-component.react'
//import OrbitalCamera from '../scene_objects/orbital-camera.react'

class Viewport extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentInteractiveCommand: ApplicationStore.getCurrentInteractiveCommand(),
      metaKey: false,
      height: 600,
      width: 600,
      sceneObjects: ViewportStore.getSceneObjects()
    }
    this.orbitControls = OrbitControls
    this.cameraData = {
      position: new THREE.Vector3(0,0,3),
      rotation: new THREE.Euler('xyz',0,0,0),
      scale: new THREE.Vector3(1,1,1)
    }
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

    window.addEventListener('keydown', (event) => {
      if (event.keyCode === 91) {
        this.setState({
          metaKey: true
        })
      }
    })

    window.addEventListener('keyup', (event) => {
      if (event.keyCode === 91) {
        this.setState({
          metaKey: false
        })
      }
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
              key={i}
              castShadow={true}
              receiveShadow={true} />
      )
    })
  }


  render() {

    let shadowBox = {
      geometry: new THREE.BoxGeometry( 1, 1, 1 ),
      material: new THREE.MeshLambertMaterial( { color: 0x8ead86 } ),
      position: new THREE.Vector3(3, 1, 0)
    }

    let sunProps = {
      target: shadowBox
    }


    let cameraProps = {
      fov : 75, aspect: this.state.width / this.state.height,
      near : 1, far : 5000,
      position : this.cameraData.position,
      rotation : this.cameraData.rotation,
      lookat: new THREE.Vector3(0,0,0),
      scale : this.cameraData.scale
    }
    let receiveCameraData = (data) => {
      this.cameraData = data
    }
    let shouldCameraLock = () => {
      let currentInteractiveCommand = ApplicationStore.getCurrentInteractiveCommand()

      if (currentInteractiveCommand && !this.state.metaKey) {
        return true
      } else {
        return false
      }
    }
    return (
      <div className="viewport" ref={ (ref) => this.viewportRef = ref }>
        <Renderer
            lockCamera={shouldCameraLock()}
            width={this.state.width}
            height={this.state.height}
            background={0x3366ff}
            cameraData={receiveCameraData}
            shadowMapEnabled={true}
            >
          <Scene
                 width={this.state.width} height={this.state.height}
                 camera="maincamera"
                 orbitControls={OrbitControls}
                 pointerEvents={['onMouseDown', 'onMouseMove']}
                 >
            <OrbitalCamera name="maincamera" {...cameraProps} />
            {this.sceneGeometry()}
            <Mesh castShadow={true} {...shadowBox} />
            <GroundPlane metaKey={this.state.metaKey} receiveShadow={true}
              /*clickToCreate={this.state.currentInteractiveCommand === 'plant'}*/
            />
            <Sky />
            <Sun {...sunProps} />


          </Scene>
        </Renderer>
      </div>
    )
  }


}



export default BaseComponent(Viewport)