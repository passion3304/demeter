/**
 *                                        validate.js
 *
 *    This module is meant to validate function parameters as a service for APIs in the application.  It's not meant to
 *    verify user input.  Here, errors will be thrown if something doesn't validate.  The module is designed to cause
 *    my programming mistakes to crash the application.
 *
 *    For simple stuff, some basic functions are provided.  For JavaScript object validation, Joi is used.
 *
 */

'use strict'

const Joi = require('joi')

let Validate = (function() {

  return {

    hasArguments: function(args) {
      return hasArguments(args)
    },

    isNumber: function(arg) {
      return isNumber(arg)
    },

    validate: function(type, value, range, throwError) {
      return validate(type, value, range, throwError)
    },

    isWithinRange: function(value, min, max) {
      return isWithinRange(value, min, max)
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

  function validateTime(time) {

    hasArguments(time.hour)
    hasArguments(time.minute)

    const schema = Joi.object().keys({
      hour: Joi.number().integer().min(0).max(23).required(),
      minute: Joi.number().integer().min(0).max(59).required()
    })

    Joi.validate(time, schema, (err) => {
      if (err) throw err
    })
  }

  function validateDate(date) {

    hasArguments(date)

    const schema = Joi.object().keys({
      year: Joi.number().integer().min(-9999).max(9999).required(),
      month: Joi.number().integer().min(0).max(11).required(),
      date: Joi.number().integer().min(1).max(31).required()
    })

    Joi.validate(date, schema, (err) => {
      if (err) throw err
    })

  }

  function validateLatitude(latitude) {

    hasArguments(latitude)

    if (!isWithinRange(latitude, -90, 90)) {
      throw new Error('bad arguments')
    }
  }

  function validateLongitude(longitude) {

    hasArguments(longitude)

    isWithinRange(longitude, -180, 180)
  }

  function hasArguments(args) {
    if (typeof args !== 'undefined') {
      return true
    } else {
      throw new Error('missing arguments')
    }
  }
  
  function isNumber(arg) {
    if (!isNaN(arg)) {
      return true
    } else {
      throw new Error('argument is not a number')
    }
  }

  /**
   *
   * @param type
   * @param value
   * @param range (optional)
   * @param throwErrors (optional)
   *
   * This is an abstraction of Joi for validating single values with optional error throwing.  I don't want the
   * application to crash if a user somehow enters a bad value, but I do want it to crash if something internally
   * is calling a function with bad arguments
   *
   *
   */

  //To do needs unit tests

  function validate(type, value, range, throwErrors) {

    let valid = false

    const args = {
      type: type,
      value: value,
      range: range,
      throwErrors: throwErrors
    }

    const functionSchema = {
      type: Joi.string().required(),
      value: Joi.required(),
      range: Joi.object({
        min: Joi.number().required(),
        max: Joi.number().required()
      }),
      throwErrors: Joi.boolean()
    }

    // validate function arguments
    Joi.validate(args, functionSchema, (err) => {
      if (err) throw err
    })

    // validate the value itself according to type and other parameters, throwing errors only if the calling
    // function specifies

    const inputValue = {
      value: value
    }

    let schemaForType = {}

    switch (type) {
      case 'number':
        schemaForType = {
          value: Joi.number()
        }
        break
      case 'integer':
        schemaForType = {
          value: Joi.number().integer()
        }
        break
      case 'natural':
        schemaForType = {
          value: Joi.number().integer().min(0)
        }
        break
      case 'string':
        schemaForType = {
          value: Joi.string()
        }
        break
      default:
        return
    }

    Joi.validate(inputValue, schemaForType, (err) => {
      if (err) {
        if (throwErrors) {
          throw err
        } else {
          valid = false
        }
      } else {
        valid = true
      }
    })

    return valid

  }

  function isWithinRange(value, min, max) {
    if (value >= min && value <= max) {
      return true
    } else {
      throw new Error('argument out of range')
    }
  }

})()

module.exports = Validate