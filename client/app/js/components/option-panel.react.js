var React = require('react');
var classNames = require('classnames');

var OptionPanel = React.createClass({
  render: function() {
    var optionPanelClass = classNames({
      'panel-hide': !this.props.componentData.active,
      'panel-show': this.props.componentData.active,
      panel: true,
      'option-panel': true
    });
    return (
      <div className={optionPanelClass}>
        <p>{this.props.componentData.displayName}</p>
      </div>
    );
  }
});

module.exports = OptionPanel;