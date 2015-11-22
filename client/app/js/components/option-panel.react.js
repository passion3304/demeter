var React = require('react');
var StateStore = require('../stores/state-store');
var StateActions = require('../actions/state-actions');
var classNames = require('classnames');

var OptionPanel = React.createClass({
  render: function() {
    var optionPanelClass = classNames({
      'hidden' : StateActions.getActiveOptionsPanel
    });
    return (
      <div className={optionPanelClass}>
        <p>I'm a panel!!</p>
      </div>
    );
  }
});