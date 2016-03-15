'use strict'

jest.dontMock('../../app/js/lib/sun-position')

let SunPosition = require('../../app/js/lib/sun-position')

describe("Sun position calculation", function() {
  it("should return the correct coordinates for summer solstice at the Tropic of Cancer", () => {
    let summerSolstice = Date.UTC(2016, 5, 21, 12)
    let sunCoords = SunPosition(summerSolstice, 23.5, 1)
    let x = sunCoords.x,
        y = sunCoords.y,
        z = sunCoords.z
    expect(x).toBeCloseTo(0, 0)
    expect(y).toBeCloseTo(70, 0)
    expect(z).toBeCloseTo(0, 0)
  })

  it("should return the correct coordinates for summer solstice at the Tropic of Capricorn", () => {
    let summerSolstice = Date.UTC(2016, 11, 21, 12)
    let sunCoords = SunPosition(summerSolstice, -23.5, 0)
    let x = sunCoords.x,
      y = sunCoords.y,
      z = sunCoords.z
    expect(x).toBeCloseTo(0, 0)
    expect(y).toBeCloseTo(70, 0)
    expect(z).toBeCloseTo(0, 0)
  })
})

