let React = require('react')
let ReactTHREE = require('react-three')
let Mesh = ReactTHREE.Mesh
let DirectionalLight = ReactTHREE.DirectionalLight
let THREE = require('three')
import SunPosition from '../lib/sun-position'
import TimeServices from '../lib/time-services'

class Sun extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    let shadowBoxSize = 60

    let date = new Date(this.props.date.year,
                        this.props.date.month,
                        this.props.date.date,
                        this.props.time.hour,
                        this.props.time.minute)

    let sunCoordinates = SunPosition(date, this.props.latitude, this.props.longitude)

    return (
        <DirectionalLight color={0xffffff}
                          position={new THREE.Vector3(sunCoordinates.x, sunCoordinates.y, sunCoordinates.z)}
                          intensity={3.0}
                          castShadow={true}
                          shadowMapWidth={4096}
                          shadowMapHeight={4096}
                          shadowCameraVisible={false}
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