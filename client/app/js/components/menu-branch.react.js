var React = require('react');
var ApplicationActions = require('../actions/application-actions');

var MenuBranch = React.createClass({
  render: function() {

    return (
      <li className="has-dropdown">
        <a href="#">{this.props.entity.displayName}</a>
        <ul className="dropdown">
          {this.renderMenuItems(this.props.entity)}
        </ul>
      </li>
    );
  },

  renderMenuItems: function(entity) {
    var self = this;

    return entity.children.map(function(menuItem, i) {

      return (
        <li key={menuItem.id}>
          <a href="#" onclick={self.handleClick.bind(null, menuItem.id)}>{menuItem.displayName}</a>
        </li>
      );
    });
  },

  handleClick: function(id) {
    console.log('handling');
  }

});

module.exports = MenuBranch;