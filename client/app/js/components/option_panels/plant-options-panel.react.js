var React = require('react');
var ApplicationActions = require('../../actions/application-actions');
var ApplicationStore = require('../../stores/application-store');
var Widgets = require('../widgets/widgets-index');
var classNames = require('classnames');
var uuid = require('node-uuid');


var PlantOptionsPanel = React.createClass({

  elementKeys: [],

  elements: {
    airbrushToggle: {}
  },

  componentDidMount: function() {
    var self = this;

    ApplicationStore.addChangeListener(self.onChange);
  },

  componentWillUnmount: function() {
    ApplicationStore.removeChangeListener(self.onChange);
  },

  render: function() {
    var self =            this;
    var Button =          Widgets.Button;

    // Airbrush Toggle
    var airbrushToggleButton =     classNames({
      active: this.elements.airbrushToggle.active
    });
    var airbrushToggle = this.elements.airbrushToggle || {};

    return (
      <div>
        <Button bsStyle="primary" className={airbrushToggleButton}
            onClick={self.handleClick.bind(null, airbrushToggle.id)}>
          <i className="fa fa-plus" />
        </Button>
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

module.exports = PlantOptionsPanel;