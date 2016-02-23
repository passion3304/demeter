let React = require('react')
let ReactTHREE = require('react-three')
let HemisphereLight = ReactTHREE.HemisphereLight
let THREE = require('three')

class Sky extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <HemisphereLight intensity={1.2} />
    )
  }
}

export default Sky