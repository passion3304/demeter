var React = require('react');
var classNames = require('classnames');
var Widgets = require('../widgets/widgets-index');

var OptionPanel = React.createClass({

  render: function() {
    var self = this;

    var children = [];

    if (typeof this.props.componentData.children !== 'undefined') {
      this.props.componentData.children.map(function(child) {
        children.push(child);
      });
    }

    var optionPanelClass = classNames({
      'panel-hide': !this.props.componentData.active,
      'panel-show': this.props.componentData.active,
      'panel': true,
      'panel-default': true,
      'option-panel': true
    });

    return (
      <div className={optionPanelClass}>
        <h1>{this.props.componentData.displayName}</h1>
        <div className = "option-panel-widgets">
          {children.map(function(child) {
            var ChildReactClass = Widgets[child.reactClass];
            return (
              <div key={child.id}>
                <ChildReactClass componentData={child} />
              </div>
            )
          })}
        </div>
      </div>
    );
  }
});

module.exports = OptionPanel;