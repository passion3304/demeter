let TimeServices = {
  convertFromMinutesAfterMidnight: function(offsetInMinutes) {
    let hour = Math.floor(offsetInMinutes / 60)
    let minute = offsetInMinutes % 60

    return {
      hour: hour,
      minute: minute
    }
  },

  formattedTime: function(time) {
    let timeString = '',
        ampm = 'am',
        hour = time.hour,
        minute = time.minute

    if ( hour >= 12 ) ampm = 'pm'
    if ( hour > 12 ) hour = hour - 12
    if ( hour === 0 ) {
      hour = 12
      ampm = 'am'
    }

    hour = hour.toString()
    minute = minute.toString()

    if ( minute < 10) minute = '0' + minute

    timeString += hour + ':' + minute + ' ' + ampm

    return timeString
  }

}

export default TimeServices