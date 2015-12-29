var React = require('react');
var ApplicationActions = require('../../actions/application-actions');
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
      'panel-hide' : !this.props.componentData.active,
      'panel-show' : this.props.componentData.active,
      'panel' : true,
      'panel-default': true,
      'option-panel': true
    });

    return (
      <div className={optionPanelClass}>
        <h1>{this.props.componentData.displayName}</h1>
        <div className = "option-panel-widgets">
          {children.map(function(child) {
            var ChildReactClass = Widgets[child.reactClass];
            child.classNames.active = child.active;
            var style = classNames(child.classNames);

            var icon = function() {
              if (typeof child.icon !== 'undefined') {
                child.icon['fa'] = true;
                var iconStyle = classNames(child.icon);
                return (
                  <i className={iconStyle} />
                );
              } else {
                return (
                  <div></div>
                );
              }
            };

            return (
              <div key={child.id}>
                <ChildReactClass className={style} componentData={child}
                                 onClick={self.handleClick.bind(null, child.id)}>
                  {icon()}
                </ChildReactClass>
              </div>
            )
          })}
        </div>
      </div>
    );
  },

  handleClick: function(id) {
    ApplicationActions.click({
      'targetID' : id
    });
  }
});

module.exports = OptionPanel;