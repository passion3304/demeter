var commands = require('../commands/command-index');

module.exports = [
  {
    name: 'plant',
    type: 'interactive',
    command: commands.plant
  },
  {
    name: 'erase',
    type: 'interactive',
    command: commands.erase
  },
  {
    name: 'electrify',
    type: 'interactive',
    command: commands.electrify
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
    name: 'airbrush',
    type: 'boolean'
  }
];