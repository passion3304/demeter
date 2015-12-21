var React = require('react');
var Widgets = require('./widgets/widgets-index');
var ApplicationActions = require('../actions/application-actions');
var ApplicationStore = require('../stores/application-store');
var classNames = require('classnames');
var _ = require('lodash');

var Menu = React.createClass({

  getInitialState: function() {
    return {
      menu: []
    };
  },

  componentDidMount: function() {
    ApplicationStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    ApplicationStore.removeChangeListener(this.onChange);
  },

  render: function() {
    var self =          this;
    var menu =          this.props.componentData;
    var Navbar =        Widgets.Navbar;
    var Nav =           Widgets.Nav;
    var NavDropdown =   Widgets.NavDropdown;
    var MenuItem =      Widgets.MenuItem;

    return (
      <Navbar fixedTop={true}>
        <Nav>
          {menu.children.map(function(menuHeader, i) {
            return (
              <NavDropdown key={i} title={menuHeader.displayName}
                 id="navbar-dropdown">
                {menuHeader.children.map(function(menuItem, i) {
                  if (menuItem.type === 'divider') {
                    return (
                      <MenuItem key={i} divider />
                    );
                  } else {
                    var menuItemClass = classNames({
                      'active': menuItem.active
                    });
                    return (
                      <MenuItem key={i} className={menuItemClass}
                                onSelect={self.handleSelect.bind(null, menuItem.id)}>
                        {menuItem.displayName}</MenuItem>
                    );
                  }
                })}
              </NavDropdown>
            );
          })}
        </Nav>
      </Navbar>
    );
  },

  onChange: function() {
    this.forceUpdate();
  },

  handleSelect: function(id) {
    ApplicationActions.click({
      targetID: id
    });
  }
});

module.exports = Menu;