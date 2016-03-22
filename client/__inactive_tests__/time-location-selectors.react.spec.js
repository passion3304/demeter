'use strict'

jest.dontMock('../../../app/js/components/widgets/time-location-selectors.react')

let React = require('../node_modules/react/react')
let ReactDOM = require('../node_modules/react-dom/index')
let TestUtils = require('../node_modules/react-addons-test-utils/index')

let TimeLocationSelectors = require('../app/js/components/widgets/time-location-selectors.react.js').default

let Toolbar = require('../app/js/components/toolbar.react.js').default
let TestComponent = require('../app/js/components/test-component.react.js').default

describe('basic rendering', () => {

  it('does not fuck up', () => {
    let testComponent = TestUtils.renderIntoDocument(
      <TestComponent />
    )

    let testComponentNode = TestUtils.findRenderedDOMComponentWithTag(testComponent, 'h2')
    console.log(testComponentNode)

    expect(testComponentNode.textContent).toEqual('Hi There')
  })

  // it ('draws sliders on the page', () => {
  //   let MySliders = TestUtils.renderIntoDocument(
  //     <TimeLocationSelectors time={{hour: 12, minute: 0}}
  //                             date={{year: 2016, month: 5, date: 21}}
  //                             latitude={23.5}
  //                             longitude={-122}
  //                             />
  //   )
  // })
})