let ValidateArguments = require('validate-arguments')

let Validate = (function() {

  return {

    emptyArgs: function(args) {
      return checkForEmptyArgs(args)
    },

    time: function(time) {
      return validateTime(time)
    },

    date: function(date) {
      return validateDate(date)
    },

    latitude: function(latitude) {
      return validateLatitude(latitude)
    },

    longitude: function(longitude) {
      return validateLongitude(longitude)
    }
  }

  function checkForEmptyArgs(args) {
    if (typeof args === 'undefined') {
      throw new Error('function in time-services called with no parameters')
    }
  }

  function validateTime(time) {

    checkForEmptyArgs(time)

    let args = ValidateArguments.validate(time, {

      hour: {
        isa: 'natural'
      },
      minute: {
        isa: 'natural'
      }
    })

    if (!withinRange(time.hour, 0, 23) ||
        !withinRange(time.minute, 0, 59)) {
      throw new Error('one or more parameters out of range')
    }

    if (!args.isValid()) {
      throw args.errorString()
    }
  }

  function validateDate(date) {

    checkForEmptyArgs(date)

    let args = ValidateArguments.validate(date, {

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

    if (!withinRange(date.year, 0, 9999) ||
        !withinRange(date.month, 0, 11) ||
        !withinRange(date.date, 1, 31)) {
      throw new Error('one or more parameters out of range')
    }

    if (!args.isValid()) {
      throw args.errorString()
    }
  }

  function validateLatitude(latitude) {
    checkForEmptyArgs(latitude)

    let args = ValidateArguments.validate(time, {
      time: 'number'
    })
  }

  function validateLongitude(longitude) {
    checkForEmptyArgs(longitude)


  }

  function withinRange(value, min, max) {
    if (value >= min && value <= max) {
      return true
    } else {
      return false
    }
  }

})()

module.exports = Validate