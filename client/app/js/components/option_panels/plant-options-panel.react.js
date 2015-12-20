var React = require('react');
var uiStore = require('../../stores/ui-store.js');
var Widgets = require('../widgets/widgets-index');
var ApplicationActions = require('../../actions/application-actions');
var classNames = require('classnames');
var uuid = require('node-uuid');


var PlantOptionsPanel = React.createClass({

  elementKeys: [],

  elements: {
    airbrushToggle: {}
  },

  componentDidMount: function() {
    var self = this;

    // initial values to load into the uiStore
    var elementsToRegister = [
      {
        id:           uuid.v1(),
        name:         'airbrushToggle',
        displayName:  'Airbrush',
        type:         'button',
        command:      'airbrush'
      }
    ];

    // retain each ID to later pull it from the uiStore
    elementsToRegister.map(function(element) {
      self.elementKeys.push({
        id:     element.id,
        name:   element.name
      });
    });

    // add every element to uiStore
    ApplicationActions.registerElements({
      elements: elementsToRegister
    });

    // pull in the elements from the uiStore with all the added fields
    this.reloadElements();

    uiStore.addChangeListener(self.onChange);
  },

  componentWillUnmount: function() {
    uiStore.removeChangeListener(self.onChange);
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
    this.reloadElements();
  },

  reloadElements: function() {
    var self = this;
    this.elementKeys.map(function(elementKey) {
      self.elements[elementKey.name] = uiStore.getElementByID(elementKey.id);
    });
  }

});

module.exports = PlantOptionsPanel;