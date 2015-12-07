var React = require('react');
var classNames = require('classnames');

var OptionPanel = React.createClass({
  render: function() {
    var optionPanelClass = classNames({
      'panel-hide': !this.props.componentData.active,
      'panel-show': this.props.componentData.active,
      'panel': true,
      'panel-default': true,
      'option-panel': true
    });
    return (
      <div className={optionPanelClass}>
        <h1 className="panel-body">{this.props.componentData.displayName}</h1>
      </div>
    );
  }
});

module.exports = OptionPanel;