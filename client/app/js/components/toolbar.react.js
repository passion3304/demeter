var React = require('react');
var ControlsStore = require('../stores/controls-store');
var ControlsConstants = require('../constants/controls-constants');
var _ = require('lodash');

var Toolbar = React.createClass({

  getInitialState: function() {
    return getToolbarControls();
  },

  render: function() {
    var self = this;
    var toolbarControls = this.state.toolbarControls;
    return (
      <ul>
      {toolbarControls.map(function(control, i) {
        return (
          <li key={i} className="toolbar-control">
            <button key={i}>
              <i className={"fa " + control.icon} />
            </button>
          </li>
        );
      })}
      </ul>
    );
  }
});

var getToolbarControls = function() {

  var toolbarControls;
  var allControls = ControlsStore.getAll();

  // pull out just the controls that are meant for the toolbar
  toolbarControls = _.filter(allControls, function(control) {
    return _.some(control.locations, 'name', ControlsConstants.TOOLBAR);
  });

  return {
    toolbarControls: toolbarControls
  };
};

module.exports = Toolbar;