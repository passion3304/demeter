let React = require('react')
let ReactTHREE = require('react-three')
let THREE = require('three')
let Renderer = ReactTHREE.Renderer
let Scene = ReactTHREE.Scene
let PerspectiveCamera = ReactTHREE.PerspectiveCamera
let Mesh = ReactTHREE.Mesh
let Object3D = ReactTHREE.Object3D
let Line = ReactTHREE.Line
let SkinnedMesh = ReactTHREE.SkinnedMesh
let AmbientLight = ReactTHREE.AmbientLight
let PointLight = ReactTHREE.PointLight
let OrbitControls = require('three-orbit-controls')(THREE)
let uuid = require('node-uuid')
let ViewportStore = require('../stores/viewport-store')
let ApplicationStore = require('../stores/application-store')
import OrbitalCamera from '../scene_objects/orbital-camera.react'
import GroundPlane from '../scene_objects/ground-plane.react'
import Sky from '../scene_objects/sky.react'
import Sun from '../scene_objects/sun.react'
import MouseIntersectionPlane from '../scene_objects/mouse-intersection-plane'
import TimeLocationSelectors from './widgets/time-location-selectors.react'
import TimeServices from '../lib/time-services'
import BaseComponent from './base-component.react'


class Viewport extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentInteractiveCommand: ApplicationStore.getCurrentInteractiveCommand(),
      metaKey: false,
      height: 600,
      width: 600,
      sceneObjects: ViewportStore.getSceneObjects(),
      guideObject: ViewportStore.getGuideObject(),
      time: ViewportStore.getCurrentTime(),
      date: ViewportStore.getCurrentDate(),
      latitude: ViewportStore.getLatitude(),
      longitude: ViewportStore.getLongitude()
    }
    this.orbitControls = OrbitControls
    this.cameraData = {
      position: new THREE.Vector3(0,0,3),
      rotation: new THREE.Euler('xyz',0,0,0),
      scale: new THREE.Vector3(1,1,1)
    }
  }

  componentDidMount() {

    this.setState({
      width: this.viewportRef.offsetWidth,
      height: this.viewportRef.offsetHeight
    })

    ViewportStore.addChangeListener(() => {
      this.setState({
        sceneObjects: ViewportStore.getSceneObjects(),
        guideObject: ViewportStore.getGuideObject(),
        time: ViewportStore.getCurrentTime(),
        date: ViewportStore.getCurrentDate(),
        latitude: ViewportStore.getLatitude(),
        longitude: ViewportStore.getLongitude()
      })
    })

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


  componentWillUnmount() {
    // ViewportStore.removeChangeListener // need to add the remove correspondant
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
              receiveShadow={true}
              onMouseDown3D={object.handleClick} />
      )
    })
  }

  guideObject() {
    if (!this.state.guideObject) {
      return null
    } else {
      return (
        <Mesh position={this.state.guideObject.position}
              material={this.state.guideObject.material}
              geometry={this.state.guideObject.geometry}
              //onMouseDown3D={this.state.guideObject.handleClick}
              />
      )
    }
  }


  render() {


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

    let handleClick = (e) => {
      console.log('clicking the viewport')
    }

    return (
      <div className="viewport"
           ref={ (ref) => this.viewportRef = ref }
           onClick={handleClick.bind(this)}>
        <div>Current time: {TimeServices.formattedTime(this.state.time)}</div>
        <div>Current date: {TimeServices.formattedDate(this.state.date)}</div>
        <div>Latitude: {this.state.latitude}</div>
        <div>Longitude: {this.state.longitude}</div>
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
            {this.guideObject()}
            <MouseIntersectionPlane />
            <GroundPlane metaKey={this.state.metaKey} receiveShadow={true} id={uuid.v1()}
            />
            <Sky />
            <Sun time={this.state.time}
                 date={this.state.date}
                 latitude={this.state.latitude}
                 longitude={this.state.longitude}
            />


          </Scene>
        </Renderer>
        <TimeLocationSelectors time={TimeServices.getMinutesSinceMidnight(this.state.time)}
                               date={TimeServices.getDaysSinceNewYear(this.state.date)}
                               latitude={this.state.latitude}
                               longitude={this.state.longitude}
        />
      </div>
    )
  }


}



export default BaseComponent(Viewport)