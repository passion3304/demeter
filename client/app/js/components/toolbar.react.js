var React = require('react');
var uiStore = require('../stores/ui-store');
var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button;
var ButtonGroup = ReactBootstrap.ButtonGroup;
var classNames = require('classnames');
var ApplicationActions = require('../actions/application-actions');

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
        <ButtonGroup vertical block>
          {self.props.componentData.children.map(function(child, i) {

            var buttonClass = classNames({
              'active': child.active
            });

            return (
              <Button key={child.id} className={buttonClass} bsStyle="primary"
                  onClick={self.handleClick.bind(null, child.id)}>
                <i className={"fa " + child.icon} />
              </Button>
            );
          })}
        </ButtonGroup>
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