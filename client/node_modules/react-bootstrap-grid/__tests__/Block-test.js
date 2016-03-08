jest.dontMock('../dist/components/Block.js');

var React = require('react/addons');
var Block = require('../dist/components/Block.js')(React);
var TestUtils = React.addons.TestUtils;

describe('Block', function () {
  describe('element type', function () {
    it('should be a div', function () {
      var el = TestUtils.renderIntoDocument(
        <Block />
      );

      expect(el['_renderedComponent']['_tag']).toEqual('div');
    });
  });

  describe('element class', function () {
    it('should have `.clearfix`', function () {
      var el = TestUtils.renderIntoDocument(
        <Block />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('clearfix');
    });

    it('should have `.visible-xs-block`', function () {
      var el = TestUtils.renderIntoDocument(
        <Block extraSmall={ true } />
      );

      expect(el['_renderedComponent']['props']['className'].trim().indexOf('visible-xs-block') >= 0).toEqual(true);
    });

    it('should have `.visible-sm-block`', function () {
      var el = TestUtils.renderIntoDocument(
        <Block small={ true } />
      );

      expect(el['_renderedComponent']['props']['className'].trim().indexOf('visible-sm-block') >= 0).toEqual(true);
    });

    it('should have `.visible-md-block`', function () {
      var el = TestUtils.renderIntoDocument(
        <Block medium={ true } />
      );

      expect(el['_renderedComponent']['props']['className'].trim().indexOf('visible-md-block') >= 0).toEqual(true);
    });

    it('should have `.visible-lg-block`', function () {
      var el = TestUtils.renderIntoDocument(
        <Block large={ true } />
      );

      expect(el['_renderedComponent']['props']['className'].trim().indexOf('visible-lg-block') >= 0).toEqual(true);
    });
  });
});
