var uuid = require('node-uuid');
var optionPanelFunctions = require('./option-panel-functions');

module.exports = [
  {
    'id': uuid.v1(),
    'name': 'Plant Options',
    'active': false,
    'locations': [
      {
        'name': 'options-panel',
        'path': 'option-panels/plant'
      }
    ],
    activate: optionPanelFunctions.activatePlantOptionPanel,
    deactivate: optionPanelFunctions.deactivatePlantOptionPanel
  },
  {
    'id': uuid.v1(),
    'name': 'Erase Options',
    'active': false,
    'locations': [
      {
        'name': 'options-panel',
        'path': 'option-panels/erase'
      }
    ],
    activate: optionPanelFunctions.activateEraseOptionPanel,
    deactivate: optionPanelFunctions.deactivateEraseOptionPanel
  }
];