var React = require('react');
var ApplicationStore = require('../../stores/application-store');

var CurrentInteractiveCommand = React.createClass({
  getInitialState: function() {
    return {
      currentInteractiveCommand: ApplicationStore.getCurrentInteractiveCommand()
    }
  },

  componentDidMount: function() {
    ApplicationStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    ApplicationStore.removeChangeListener(this.onChange);
  },

  render: function() {
    return (
      <div className="current-interactive-command">
        <p>{this.state.currentInteractiveCommand}</p>
      </div>
    );
  },

  onChange: function() {
    this.setState({
      currentInteractiveCommand: ApplicationStore.getCurrentInteractiveCommand()
    });
  }
});

module.exports = CurrentInteractiveCommand;