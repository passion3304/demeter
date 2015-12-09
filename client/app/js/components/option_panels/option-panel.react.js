var React = require('react');
var classNames = require('classnames');
var Panels = require('./panels-index');

var OptionPanel = React.createClass({
  render: function() {
    var optionPanelClass = classNames({
      'panel-hide': !this.props.componentData.active,
      'panel-show': this.props.componentData.active,
      'panel': true,
      'panel-default': true,
      'option-panel': true
    });
    var ReactSubClass = Panels[this.props.componentData.reactSubClass];
    return (
      <div className={optionPanelClass}>
        <h1>{this.props.componentData.displayName}</h1>
        <ReactSubClass></ReactSubClass>
      </div>
    );
  }
});

module.exports = OptionPanel;