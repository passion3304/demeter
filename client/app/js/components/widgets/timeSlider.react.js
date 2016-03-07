let React = require('react')
import ReactSliderNativeBootstrap from 'react-bootstrap-native-slider';

class TimeSlider extends React.Component {
  render() {
    return (
      <ReactSliderNativeBootstrap {...this.props} />
    )
  }
}

export default TimeSlider