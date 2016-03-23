var commands = require('../commands/command-index');

// this module feels redundant when adding new functaionality to the application.  What's the difference between
// commands.js (this module) and command-index.js under the ../commands folder anyway?  Maybe rename command in this
// object commandModule or something like that

module.exports = [
  {
    name: 'plant',
    type: 'interactive',
    command: commands.plant
  },
  {
    name: 'primitive',
    type: 'interactive',
    command: commands.primitive
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
  }
];