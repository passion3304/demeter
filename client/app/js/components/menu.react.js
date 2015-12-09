var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavDropdown = ReactBootstrap.NavDropdown;
var MenuItem = ReactBootstrap.MenuItem;
var ApplicationActions = require('../actions/application-actions');
var uiStore = require('../stores/ui-store');
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
    var self = this;
    var menu = this.props.componentData;

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