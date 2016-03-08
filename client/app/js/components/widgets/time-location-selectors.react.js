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

    let changeDateSliderValue = (event) => {
      let daysSinceNewYear = event.target.value
      let newDate = TimeServices.convertFromDaysAfterNewYear(daysSinceNewYear)
      ViewportActions.setDate({
        date: newDate
      })
    }

    let changeLatitudeSliderValue = (event) => {
      let latitude = event.target.value
      ViewportActions.setLatitude({
        latitude: latitude,
      })
    }

    let changeLongitudeSliderValue = (event) => {
      let longitude = event.target.value
      ViewportActions.setLongitude({
        longitude: longitude
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
              handleChange={changeDateSliderValue}
              step={1}
              max={364}
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
              handleChange={changeLatitudeSliderValue}
              step={1}
              max={90}
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
              handleChange={changeLongitudeSliderValue}
              step={1}
              max={180}
              min={-180}
              disabled="disabled" />
          </Grid.Column>
        </Grid.Row>
      </div>
    )
  }
}

export default TimeLocationSelectors