var React = require('react');
var ApplicationActions = require('../actions/application-actions');
var uiStore = require('../stores/ui-store');
var MenuBrach = require('./menu-branch.react');
var classNames = require('classnames');
var _ = require('lodash');

var Menu = React.createClass({

  getInitialState: function() {
    return {
      menu: []
    };
  },

  componentDidMount: function() {
    uiStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    uiStore.removeChangeListener(this.onChange);
  },

  render: function() {
    var menu = this.props.componentData;

    return (
      <div className="fixed">
        <nav className="top-bar" data-topbar role="navigation">
          <section className="top-bar-section">
            <ul className="left">
              {menu.children.map(function(menuTop, i) {
                return (
                  <MenuBrach key={menuTop.id} entity={menuTop} />
                );
              })}
            </ul>
          </section>
        </nav>
      </div>
    );
  },

  onChange: function() {
    this.forceUpdate();
  }
});

module.exports = Menu;