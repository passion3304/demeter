let SunCalc = require('suncalc')

function SunPosition(date) {
  let distance = 70
  let sunPosition = SunCalc.getPosition(date, 51.5, -121)
  let azimuth = (360 * (Math.PI / 180)) - sunPosition.azimuth
  let altitude = (90 * (Math.PI / 180)) - sunPosition.altitude

  let sunCoordinates = {
    x: distance * Math.sin(altitude) * Math.sin(azimuth),
    y: distance * Math.cos(altitude),
    z: distance * Math.sin(altitude) * Math.cos(azimuth)
  }

  return sunCoordinates
}

export default SunPosition