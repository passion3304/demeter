'use strict'

jest.dontMock('../../../app/js/components/widgets/time-location-selectors.react')

let React = require('../../../node_modules/react')
let ReactDOM = require('../../../node_modules/react-dom')
let TestUtils = require('../../../node_modules/react-addons-test-utils')

let TimeLocationSelectors = require('../../../app/js/components/widgets/time-location-selectors.react').default

let Toolbar = require('../../../app/js/components/toolbar.react').default
let TestComponent = require('../../../app/js/components/test-component.react').default

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