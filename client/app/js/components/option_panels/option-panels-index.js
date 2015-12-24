//module.exports = {
//  PlantOptionsPanel: require('./plant-options-panel.react'),
//  EraseOptionsPanel: require('./erase-options-panel.react'),
//  ElectrifyOptionsPanel: require('./electrify-options-panel.react')
//};

module.exports = [
  {
    name: 'plant-options-panel',
    children: [
      {
        name: 'airbrushToggle',
        displayName: 'Airbrush',
        type: 'button',
        command: 'airbrush'
      }
    ]
  }
];