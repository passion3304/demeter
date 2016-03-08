jest.dontMock('../dist/components/Row.js');

var React = require('react/addons');
var Row = require('../dist/components/Row.js')(React);
var TestUtils = React.addons.TestUtils;

describe('Row', function () {
  describe('element type', function () {
    it('should be a div', function () {
      var el = TestUtils.renderIntoDocument(
        <Row />
      );

      expect(el['_renderedComponent']['_tag']).toEqual('div');
    });
  });

  describe('element class', function () {
    it('should have `.row`', function () {
      var el = TestUtils.renderIntoDocument(
        <Row />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('row');
    });
  });

  describe('pass class name', function () {
    it('should have `.some-class`', function () {
      var el = TestUtils.renderIntoDocument(
        <Row className={ 'some-class' } />
      );

      expect(el['_renderedComponent']['props']['className'].trim().indexOf('some-class') >= 0).toEqual(true);
    });
  });
});
