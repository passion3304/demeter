let React = require('react')
let ReactTHREE = require('react-three')
let Scene = ReactTHREE.Scene
let PerspectiveCamera = ReactTHREE.PerspectiveCamera
let Mesh = ReactTHREE.Mesh
let AmbientLight = ReactTHREE.AmbientLight
let THREE = require('three')
import BaseComponent from './base-component.react'

var Viewport = React.createClass({

  getInitialState: function() {
    return {
      height: 100,
      width: 100
    }
  },


  //componentDidMount: function() {
  //  this.resize();
  //  window.addEventListener('resize', this.resize);
  //},
  //componentWillUnmount() {
  //  window.removeEventListener('resize', this.resize);
  //}
  //
  //resize() {
  //}

  render: function() {
    let aspectRatio = this.state.width / this.state.height
    let cameraProps = { fov:75, aspect:aspectRatio, near:0.1, far:1000,
                        position: new THREE.Vector3(0,0,6), lookat:new THREE.Vector3(0, 0, 0) }



    let geometry = new THREE.BoxGeometry( 1, 1, 1 )
    let material = new THREE.MeshLambertMaterial( { color: 0x8ead86 } )
    let position = new THREE.Vector3(0,0,0)
    let lightColor = new THREE.Color(0xffffff)


    return (
      <div className="viewport">
        <Scene width={500} height={500} camera="maincamera">
          <PerspectiveCamera name="maincamera" {...cameraProps} />
          <Mesh position={position} material={material} geometry={geometry} />
          <AmbientLight color={lightColor} />
        </Scene>
      </div>
    )


    //var MyCube = React.createElement(
    //  ReactTHREE.Mesh,
    //  { position:position, geometry:geometry, material:material, key: 'myCube' }
    //)
    //
    //let MyLight = React.createElement(
    //  ReactTHREE.AmbientLight,
    //  { color: lightColor, key: 'myLight' }
    //)
    //
    //var MainCameraElement = React.createElement(
    //  ReactTHREE.PerspectiveCamera,
    //  {name:'maincamera', fov:'75', aspect:aspectRatio,
    //    near:0.1, far:1000,
    //    position:new THREE.Vector3(0, 0, 6), lookat:new THREE.Vector3(0, 0, 0),
    //    key: 'maincamera'});
    //
    //return React.createElement(
    //  ReactTHREE.Scene,
    //  {width: 500, height: 500, camera: 'maincamera', className:'viewport'},
    //  [ MainCameraElement, MyCube, MyLight ]
    //)

    //let geometry = new THREE.BoxGeometry( 1, 1, 1 )
    //let material = new THREE.MeshLambertMaterial( { color: 0x8ead86 } )
    //let cube = new THREE.Mesh( geometry, material )
    //this.scene.add( cube )
    //
    //let pointLight = new THREE.PointLight(0xFFFFFF)
    //
    //// set its position
    //pointLight.position.x = 10
    //pointLight.position.y = 50
    //pointLight.position.z = 130
    //
    //// add to the scene
    //this.scene.add(pointLight)
    //
    //this.camera.position.z = 5
    //
    //let render = function () {
    //  requestAnimationFrame(render)
    //
    //  cube.rotation.x += 0.01
    //  cube.rotation.y += 0.01
    //
    //  self.renderer.render(self.scene, self.camera)
    //}
    //
    //this.renderer.render(this.scene, this.camera)
    //
    //return (
    //  <div>
    //    {render()}
    //  </div>
    //)
  }
})

module.exports = Viewport

//export default BaseComponent(Viewport)