let React = require('react')
let ReactTHREE = require('react-three')
let PerspectiveCamera = ReactTHREE.PerspectiveCamera
let THREE = require('three')
//let TrackballControls = require('three.trackball')
//let ApplicationStore = require('../stores/application-store')

class OrbitalCamera extends React.Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  render() {

    return (
      <PerspectiveCamera {...this.props} />
    )
  }
}

export default OrbitalCamera