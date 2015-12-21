var React = require('react');
var ApplicationStore = require('../stores/application-store');
var Toolbar = require('./toolbar.react');
var Menu = require('./menu.react');
var Viewport = require('./viewport.react');
var OptionPanel = require('./option_panels/option-panel.react.js');
var _ = require('lodash');

var ReactClasses = {
  Toolbar:      Toolbar,
  Viewport:     Viewport,
  Menu:         Menu,
  OptionPanel:  OptionPanel
};

var Application = React.createClass({

  getInitialState: function() {
    return {
      components: {}
    }
  },

  componentDidMount: function() {
    ApplicationStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    ApplicationStore.removeChangeListener(this.onChange);
  },

  render: function() {
    if (!ApplicationStore.appLoaded()) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );

    } else {
      var componentClasses = this.state.components;
      var componentsToRender = [];

      // get all component types like toolbars, viewport, panels, etc. from settings
      _.forEach(componentClasses, function(componentClass) {
        _.forEach(componentClass, function(component) {
          if (component.visible) {

            componentsToRender.push(component);
          }
        });
      });

      // render each component in turn using a dynamic component name
      return (
        <div> {componentsToRender.map(function(componentToRender, i) {
          var ComponentReactClass = ReactClasses[componentToRender.reactClass];
          return (
            <div key={i}>
              <ComponentReactClass componentData={componentToRender} />
            </div>
          );
        })}
        </div>
      );

    }
  },

  onChange: function() {
    this.setState({
      components: ApplicationStore.getComponents()
    });
  }
});

module.exports = Application;