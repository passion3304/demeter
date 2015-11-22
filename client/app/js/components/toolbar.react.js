var React = require('react');
var classNames = require('classnames');
var ApplicationActions = require('../actions/application-actions');
var StateStore = require('../stores/state-store');
var StateActions = require('../actions/state-actions');
var _ = require('lodash');

var Toolbar = React.createClass({

  getInitialState: function() {
    return {
      toolbarControls: []
    };
  },

  componentDidMount: function() {
    StateStore.addChangeListener(this.onChange);
    this.setState({ toolbarControls: StateStore.getToolbarCommands() });
  },


  componentWillUnmount: function() {
    StateStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var self = this;
    var toolbarControls = this.state.toolbarControls;
    return (
      <div className="toolbar">
        <ul className="side-nav">
        {toolbarControls.map(function(control, i) {

          var buttonClass = classNames({
            'success' : (toolbarControls[i].type === 'command'),
            'warning' : toolbarControls[i].active,
            'button' : true,
            'round' : true
          });

          return (
            <li key={i} className="toolbar-control">
              <button key={i} className={buttonClass} onClick={self.handleClick.bind(null, i)}>
                <i className={"fa " + control.icon} />
              </button>
            </li>
          );
        })}
        </ul>
      </div>
    );
  },

  handleClick: function(i) {
    ApplicationActions.click({
      'target' : this.state.toolbarControls[i]
    });
  },


  onChange: function() {
    this.setState({ toolbarControls: StateStore.getToolbarControls() });
  }
});


module.exports = Toolbar;