var React = require('react');
var classNames = require('classnames');
var ApplicationActions = require('../actions/application-actions');
var uiStore = require('../stores/ui-store');

var Toolbar = React.createClass({

  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    uiStore.addChangeListener(this.onChange);
  },


  componentWillUnmount: function() {
    uiStore.removeChangeListener(this.onChange);
  },

  render: function() {
    var self = this;

    return (
      <div className="toolbar">
        <ul className="button-group stack">
          {self.props.componentData.children.map(function(child, i) {

            var buttonClass = classNames({
              button: true,
              small: true,
              info: !self.props.componentData.children[i].active,
              default: self.props.componentData.children[i].active
            });

            return (
              <li key={i}>
                <button key={child.id} className={buttonClass}
                    onClick={self.handleClick.bind(null, child.id)}>
                  <i className={"fa " + child.icon} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );

  },

  handleClick: function(id) {
    ApplicationActions.click({
      'targetID' : id
    });
  },


  onChange: function() {
    this.forceUpdate();
  }
});


module.exports = Toolbar;