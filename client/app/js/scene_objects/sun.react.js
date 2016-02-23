let React = require('react')
let ReactTHREE = require('react-three')
let DirectionalLight = ReactTHREE.DirectionalLight
let THREE = require('three')

class Sun extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    let lightPosition = new THREE.Vector3(1, 3, -1)
    let lightTarget = new THREE.Vector3(0, 0, 0)

    return (
      <DirectionalLight color={0xffffff}
                        position={lightPosition}
                        intensity={3.0}
                        target={lightTarget} castShadow={true} />
    )
  }
}

export default Sun