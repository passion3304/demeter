'use strict'

jest.dontMock('../../app/js/lib/validate')

let Validate = require('../../app/js/lib/validate')

describe('validate rejection', () => {
  it('throws error on no arguments', () => {
    var undefinedVar
    expect( () => { Validate.hasArguments(undefinedVar) } ).toThrow('missing arguments')
  })

  it('throws error on invalid date', () => {
    expect( () => { Validate.date({ month: 13, date: 1, year: 2000 }) } ).toThrow()
    expect( () => { Validate.date({ month: 11, date: 32, year: 2000 }) } ).toThrow()
    expect( () => { Validate.date({ month: 11, date: 1, year: 10000 }) } ).toThrow()

    expect( () => { Validate.date({ month: 11, date: 1 }) } ).toThrow()
    expect( () => { Validate.date({ year: 1996 }) } ).toThrow()
  })

  it('throws error on invalid time', () => {
    expect( () => { Validate.time({ hour: 25, minute: 1 }) } ).toThrow()
    expect( () => { Validate.time({ hour: 12, minute: 62 }) } ).toThrow()

    expect( () => { Validate.time({ hour: 12}) } ).toThrow('missing arguments')
    expect( () => { Validate.time({ minute: 1}) } ).toThrow('missing arguments')
  })

  it('throws error on invalid latitude', () => {
    expect( () => { Validate.latitude(160) } ).toThrow('argument out of range')
    expect( () => { Validate.latitude(-1000) } ).toThrow('argument out of range')

    expect( () => { Validate.latitude() } ).toThrow('missing arguments')
  })

  it('throws error on invalid longitude', () => {
    expect( () => { Validate.longitude(190) } ).toThrow('argument out of range')
    expect( () => { Validate.longitude(-1000) } ).toThrow('argument out of range')

    expect( () => { Validate.longitude() } ).toThrow('missing arguments')
  })

  it('throws error when argument out of range', () => {
    expect( () => { Validate.isWithinRange(100, 0, 50) }).toThrow('argument out of range')
    expect( () => { Validate.isWithinRange(-50, 0, 50) }).toThrow('argument out of range')

    expect( () => { Validate.isWithinRange(100, 0, 100) }).not.toThrow()
  })
})