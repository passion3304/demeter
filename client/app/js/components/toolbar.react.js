var React = require('react');
var ApplicationActions = require('../actions/application-actions');
var ApplicationStore = require('../stores/application-store');
var Widgets = require('./widgets/widgets-index');
var classNames = require('classnames');

var Toolbar = React.createClass({

  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    ApplicationStore.addChangeListener(this.onChange);
  },


  componentWillUnmount: function() {
    ApplicationStore.removeChangeListener(this.onChange);
  },

  render: function() {
    var self = this;
    var Button = Widgets.Button;
    var ButtonGroup = Widgets.ButtonGroup;

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
  }
});


module.exports = Toolbar;