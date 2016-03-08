let React = require('react')
let ViewportActions = require('../../actions/viewport-actions')
import TimeServices from '../../lib/time-services'
import ReactSliderNativeBootstrap from 'react-bootstrap-native-slider'
let Slider = ReactSliderNativeBootstrap
import Grid from '../utility/grid'

class TimeLocationSelectors extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    let changeTimeSliderValue = (event) => {
      let minutesPastMidnight = event.target.value
      let newTime = TimeServices.convertFromMinutesAfterMidnight(minutesPastMidnight)
      ViewportActions.setTime({
        time: newTime
      })
    }


    return (
      <div>
        <Grid.Row className="time-selector">
          <Grid.Column large={2}>
             Time
          </Grid.Column>
          <Grid.Column large={8}>
            <Slider
              handleChange={changeTimeSliderValue}
              step={5}
              max={1439}    // number of minutes in a day
              min={0}
              disabled="disabled" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="date-selector">
          <Grid.Column large={2}>
            Date
          </Grid.Column>
          <Grid.Column large={8}>
            <Slider
              //handleChange={changeTimeSliderValue}
              step={1}
              max={364}    // number of minutes in a day
              min={0}
              disabled="disabled" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="latitude-selector">
          <Grid.Column large={2}>
            Latitude
          </Grid.Column>
          <Grid.Column large={8}>
            <Slider
              //handleChange={changeTimeSliderValue}
              step={1}
              max={90}    // number of minutes in a day
              min={-90}
              disabled="disabled" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="longitude-selector">
          <Grid.Column large={2}>
            Longitude
          </Grid.Column>
          <Grid.Column large={8}>
            <Slider
              //handleChange={changeTimeSliderValue}
              step={1}
              max={180}    // number of minutes in a day
              min={-180}
              disabled="disabled" />
          </Grid.Column>
        </Grid.Row>
      </div>
    )
  }
}

export default TimeLocationSelectors