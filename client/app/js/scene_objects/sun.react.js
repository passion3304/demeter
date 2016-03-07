let React = require('react')
let ReactTHREE = require('react-three')
let Mesh = ReactTHREE.Mesh
let DirectionalLight = ReactTHREE.DirectionalLight
let THREE = require('three')
let SunCalc = require('suncalc')

class Sun extends React.Component {
  constructor(props) {
    super(props)
  }

  getPosition(timeAndDate, latitude, longitude) {
    return SunCalc.getPosition(timeAndDate, latitude, longitude)
  }

  render() {

    let lightPosition = new THREE.Vector3(50, 50, -50)
    let shadowBoxSize = 30
    let distance = 70

    let date = new Date('June 21, 2015 ' + this.props.currentTime + ':00:00')
    let times = SunCalc.getTimes(date, 51.5, -121)
    let sunPosition = this.getPosition(date, 51.5, -121)
    let azimuth = sunPosition.azimuth // * (180 / Math.PI) //(sunPosition.azimuth * 180 / Math.PI + 180) % 360
    let altitude = sunPosition.altitude // * (180 / Math.PI)
    azimuth = (360 * (Math.PI / 180)) - azimuth
    altitude = (90 * (Math.PI / 180)) - altitude

    let sunCoordinates = {
      x: distance * Math.sin(altitude) * Math.sin(azimuth),
      y: distance * Math.cos(altitude),
      z: distance * Math.sin(altitude) * Math.cos(azimuth)
    }

    //let testAzimuth = 90 * (Math.PI / 180)
    //let testAltitude = 60 * (Math.PI / 180)
    //let testDistance = 50
    //
    //let testCoordinates = {
    //  x: testDistance * Math.sin(testAltitude) * Math.sin(testAzimuth),
    //  y: testDistance * Math.cos(testAltitude),
    //  z: testDistance * Math.sin(testAltitude) * Math.cos(testAzimuth)
    //}

    return (
        <DirectionalLight color={0xffffff}
                          position={new THREE.Vector3(sunCoordinates.x, sunCoordinates.y, sunCoordinates.z)}
                          intensity={3.0}
                          castShadow={true}
                          shadowMapWidth={4096}
                          shadowMapHeight={4096}
                          shadowCameraVisible={true}
                          shadowCameraLeft={-shadowBoxSize}
                          shadowCameraRight={shadowBoxSize}
                          shadowCameraTop={shadowBoxSize}
                          shadowCameraBottom={-shadowBoxSize}
                          shadowCameraFar={200}
        />

    )
  }
}

export default Sun