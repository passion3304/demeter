let React = require('react')
let ViewportActions = require('../../actions/viewport-actions')
import TimeServices from '../../lib/time-services'
import Widgets from './widgets-index'
import Grid from '../utility/grid'

class TimeLocationSelectors extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {

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
        latitude: latitude
      })
    }

    let changeLongitudeSliderValue = (event) => {
      let longitude = event.target.value
      ViewportActions.setLongitude({
        longitude: longitude
      })
    }

    let getValue = (slider) => {
      return this.props[slider]
    }


    return (
      <div>
        <Grid.Row className="time-selector">
          <Grid.Column large={2}>
             Time
          </Grid.Column>
          <Grid.Column large={8}>
            <Widgets.Slider
              value={getValue('time')}
              handleChange={changeTimeSliderValue}
              step={5}
              max={1439}    // number of minutes in a day
              min={0} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="date-selector">
          <Grid.Column large={2}>
            Date
          </Grid.Column>
          <Grid.Column large={8}>
            <Widgets.Slider
              value={getValue('date')}
              handleChange={changeDateSliderValue}
              step={1}
              max={364}
              min={0} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="latitude-selector">
          <Grid.Column large={2}>
            Latitude
          </Grid.Column>
          <Grid.Column large={8}>
            <Widgets.Slider
              value={getValue('latitude')}
              handleChange={changeLatitudeSliderValue}
              step={1}
              max={90}
              min={-90} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="longitude-selector">
          <Grid.Column large={2}>
            Longitude
          </Grid.Column>
          <Grid.Column large={8}>
            <Widgets.Slider
              value={getValue('longitude')}
              handleChange={changeLongitudeSliderValue}
              step={1}
              max={180}
              min={-180} />
          </Grid.Column>
        </Grid.Row>
      </div>
    )
  }
}

export default TimeLocationSelectors