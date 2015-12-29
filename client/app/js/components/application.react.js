var React = require('react');
var ApplicationStore = require('../stores/application-store');
var reactClasses = require('./react-class-index');
var _ = require('lodash');


var Application = React.createClass({

  getInitialState: function() {
    return {
      containerComponents: {}
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
      var containerComponents = this.state.containerComponents;
      var componentsToRender = [];

      // get all top level component types like toolbars, viewport, panels, etc.
      _.forEach(containerComponents, function(component) {
        if (component.visible) {
          componentsToRender.push(component);
        }
      });

      // render each component in turn using a dynamic component name
      return (
        <div> {componentsToRender.map(function(componentToRender, i) {
          var ComponentReactClass = reactClasses[componentToRender.reactClass];
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
      containerComponents: ApplicationStore.ui.getContainerComponents()
    });
  }
});

module.exports = Application;