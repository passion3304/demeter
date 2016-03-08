jest.dontMock('../dist/components/Container.js');

var React = require('react/addons');
var Container = require('../dist/components/Container.js')(React);
var TestUtils = React.addons.TestUtils;

describe('Container', function () {
  describe('element type', function () {
    it('should be a div', function () {
      var el = TestUtils.renderIntoDocument(
        <Container />
      );

      expect(el['_renderedComponent']['_tag']).toEqual('div');
    });
  });

  describe('element class', function () {
    it('should have `.container`', function () {
      var el = TestUtils.renderIntoDocument(
        <Container />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('container');
    });

    it('should have `.container-fluid`', function () {
      var el = TestUtils.renderIntoDocument(
        <Container fluid={ true } />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('container-fluid');
    });
  });

  describe('pass class name', function () {
    it('should have `.some-class`', function () {
      var el = TestUtils.renderIntoDocument(
        <Container className={ 'some-class' } />
      );

      expect(el['_renderedComponent']['props']['className'].trim().indexOf('some-class') >= 0).toEqual(true);
    });
  });
});
