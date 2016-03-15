'use strict'

let Moment = require('moment')
let Validate = require('validate-arguments')


let TimeServices = (function() {

  let months = Moment.months()

  let now = new Moment()

  return {
    convertFromMinutesAfterMidnight: function(offsetInMinutes) {
      if (typeof offsetInMinutes === 'undefined') {
        throw new Error('function in time-services called with no parameters')
      }
      let hour = Math.floor(offsetInMinutes / 60)
      let minute = offsetInMinutes % 60

      return {
        hour: hour,
        minute: minute
      }
    },

    convertFromDaysAfterNewYear: function(offsetInDays, year) {
      if (typeof offsetInDays === 'undefined') {
        throw new Error('function in time-services called with no parameters')
      }
      checkForEmptyArgs(offsetInDays)
      if (typeof year === 'undefined') {
        year = now.year()
      }
      let newYear = Moment(new Date(year, 0, 1))
      let newDate = newYear.add(offsetInDays, 'days')
      return {
        year: newDate.year(),
        month: newDate.month(),
        date: newDate.date()
      }
    },

    getMinutesSinceMidnight: function(time) {
      validateTime(time)

      return time.hour * 60 + time.minute
    },

    getDaysSinceNewYear: function(date) {

      validateDate(date)

      let newYear = Moment(new Date(date.year, 0, 1))
      let current = Moment(new Date(date.year, date.month, date.date))
      return current.diff(newYear, 'days')
    },

    formattedTime: function(time) {

      validateTime(time)

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
    },

    formattedDate: function(date) {

      validateDate(date)

      let dateString = ''
      dateString += months[date.month] + ' ' + (date.date) + ', ' + date.year

      return dateString
    }
  }



})()

function validateTime(time) {

  checkForEmptyArgs(time)

  let args = Validate.validate(time, {

    hour: {
      isa: 'natural'
    },
    minute: {
      isa: 'natural'
    }
  })

  if (!args.isValid()) {
    throw args.errorString()
  }
}

function validateDate(date) {

  checkForEmptyArgs(date)

  let args = Validate.validate(date, {

    year: {
      isa: 'natural'
    },
    month: {
      isa: 'natural'
    },
    date: {
      isa: 'natural'
    }
  })

  if (!args.isValid()) {
    throw args.errorString()
  }
}

function checkForEmptyArgs(args) {
  if (typeof args === 'undefined') {
    throw new Error('function in time-services called with no parameters')
  }
}

module.exports = TimeServices