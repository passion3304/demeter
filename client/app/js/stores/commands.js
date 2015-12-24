module.exports = [
  {
    name: 'plant',
    type: 'interactive',
    optionPanel: true   // commands shouldn't need to keep track of whether a panel should be associated
  },
  {
    name: 'erase',
    type: 'interactive',
    optionPanel: true
  },
  {
    name: 'electrify',
    type: 'interactive',
    optionPanel: true
  },
  {
    name: 'invert',
    type: 'boolean'
  },
  {
    name: 'clear_scene',
    type: 'instant'
  },
  {
    name:     'airbrush',
    type:     'boolean'
  }
];