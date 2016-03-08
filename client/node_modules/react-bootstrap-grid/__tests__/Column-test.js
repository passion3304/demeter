jest.dontMock('../dist/components/Column.js');

var React = require('react/addons');
var Column = require('../dist/components/Column.js')(React);
var TestUtils = React.addons.TestUtils;

describe('Column', function () {
  describe('element type', function () {
    it('should be a div', function () {
      var el = TestUtils.renderIntoDocument(
        <Column />
      );

      expect(el['_renderedComponent']['_tag']).toEqual('div');
    });
  });

  describe('element class name', function () {
    it('should have xs column class', function () {
      var el = TestUtils.renderIntoDocument(
        <Column extraSmall={ 1 } />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-xs-1');
    });

    it('should have small column class', function () {
      var el = TestUtils.renderIntoDocument(
        <Column small={ 1 } />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-sm-1');
    });

    it('should have medium column class', function () {
      var el = TestUtils.renderIntoDocument(
        <Column medium={ 1 } />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-md-1');
    });

    it('should have large column class', function () {
      var el = TestUtils.renderIntoDocument(
        <Column large={ 1 } />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-lg-1');
    });

    it ('should have custom class name', function () {
      var el = TestUtils.renderIntoDocument(
        <Column large={ 1 }
                className={ 'some-class' } />
      );

      expect(el['_renderedComponent']['props']['className'].indexOf('some-class') >= 0).toEqual(true);
    });
  });

  describe('offset', function () {
    it('should have xs offset class', function () {
      var el = TestUtils.renderIntoDocument(
        <Column extraSmallOffset={ 1 } />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-xs-offset-1');
    });

    it('should have small offset class', function () {
      var el = TestUtils.renderIntoDocument(
        <Column smallOffset={ 1 } />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-sm-offset-1');
    });

    it('should have medium offset class', function () {
      var el = TestUtils.renderIntoDocument(
        <Column mediumOffset={ 1 } />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-md-offset-1');
    });

    it('should have large offset class', function () {
      var el = TestUtils.renderIntoDocument(
        <Column largeOffset={ 1 } />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-lg-offset-1');
    });
  });

  describe('push', function () {
    it('should have xs push', function () {
      var el = TestUtils.renderIntoDocument(
        <Column extraSmallPush={ 1 } />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-xs-push-1');
    });

    it('should have sm push', function () {
      var el = TestUtils.renderIntoDocument(
        <Column smallPush={ 1 } />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-sm-push-1');
    });

    it('should have md push', function () {
      var el = TestUtils.renderIntoDocument(
        <Column mediumPush={ 1 } />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-md-push-1');
    });

    it('should have lg push', function () {
      var el = TestUtils.renderIntoDocument(
        <Column largePush={ 1 } />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-lg-push-1');
    });
  });

  describe('pull', function () {
    it('should have xs pull', function () {
      var el = TestUtils.renderIntoDocument(
        <Column extraSmallPull={ 1 } />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-xs-pull-1');
    });

    it('should have sm pull', function () {
      var el = TestUtils.renderIntoDocument(
        <Column smallPull={ 1 } />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-sm-pull-1');
    });

    it('should have md pull', function () {
      var el = TestUtils.renderIntoDocument(
        <Column mediumPull={ 1 } />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-md-pull-1');
    });

    it('should have lg pull', function () {
      var el = TestUtils.renderIntoDocument(
        <Column largePull={ 1 } />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-lg-pull-1');
    });
  });

  describe('identical column numbers', function () {
    it('should ignore sm', function () {
      var el = TestUtils.renderIntoDocument(
        <Column extraSmall={ 1 }
                small={ 1 } />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-xs-1');
    });

    it('should ignore md', function () {
      var el = TestUtils.renderIntoDocument(
        <Column small={ 1 }
                medium={ 1 } />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-sm-1');
    });

    it('should ignore lg', function () {
      var el = TestUtils.renderIntoDocument(
        <Column medium={ 1 }
                large={ 1 } />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-md-1');
    });

    it('should ignore sm, md, lg', function () {
      var el = TestUtils.renderIntoDocument(
        <Column extraSmall={ 1 }
                small={ 1 }
                medium={ 1 }
                large={ 1 } />
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-xs-1');
    });
  });

  describe('identical offset numbers', function () {
    it('should ignore sm-offset', function () {
      var el = TestUtils.renderIntoDocument(
        <Column extraSmallOffset={ 1 }
                smallOffset={ 1 }/>
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-xs-offset-1');
    });

    it('should ignore md-offset', function () {
      var el = TestUtils.renderIntoDocument(
        <Column smallOffset={ 1 }
                mediumOffset={ 1 }/>
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-sm-offset-1');
    });

    it('should ignore lg-offset', function () {
      var el = TestUtils.renderIntoDocument(
        <Column mediumOffset={ 1 }
                largeOffset={ 1 }/>
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-md-offset-1');
    });
  });

  describe('identical push numbers', function () {
    it('should ignore sm-push', function () {
      var el = TestUtils.renderIntoDocument(
        <Column extraSmallPush={ 1 }
                smallPush={ 1 }/>
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-xs-push-1');
    });

    it('should ignore md-push', function () {
      var el = TestUtils.renderIntoDocument(
        <Column smallPush={ 1 }
                mediumPush={ 1 }/>
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-sm-push-1');
    });

    it('should ignore lg-push', function () {
      var el = TestUtils.renderIntoDocument(
        <Column mediumPush={ 1 }
                largePush={ 1 }/>
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-md-push-1');
    });
  });

  describe('identical pull numbers', function () {
    it('should ignore sm-pull', function () {
      var el = TestUtils.renderIntoDocument(
        <Column extraSmallPull={ 1 }
                smallPull={ 1 }/>
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-xs-pull-1');
    });

    it('should ignore md-pull', function () {
      var el = TestUtils.renderIntoDocument(
        <Column smallPull={ 1 }
                mediumPull={ 1 }/>
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-sm-pull-1');
    });

    it('should ignore lg-pull', function () {
      var el = TestUtils.renderIntoDocument(
        <Column mediumPull={ 1 }
                largePull={ 1 }/>
      );

      expect(el['_renderedComponent']['props']['className'].trim()).toEqual('col-md-pull-1');
    });
  });
});
