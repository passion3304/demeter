var uuid = require('node-uuid');
var controlFunctions = require('./command-functions');

module.exports = [
  {
    'id': uuid.v1(),
    'name': 'Plant',
    'active': false,
    'type': 'interactive',
    'icon': 'fa-tree',
    'locations': [
      {
        'name': 'toolbar',
        'path': 'toolbar/primary'
      }
    ],
    activate: controlFunctions.interactive.activatePlantControl,
    deactivate: controlFunctions.interactive.deactivatePlantControl,
    mouseDownFunction: {},
    children: [
      {
        'path': 'option-panels/plant'
      }
    ]
  },
  {
    'id': uuid.v1(),
    'name': 'Erase',
    'active': false,
    'type': 'interactive',
    'icon': 'fa-minus',
    'locations': [
      {
        'name': 'toolbar',
        'path': 'toolbar/primary'
      }
    ],
    activate: controlFunctions.interactive.activateErase,
    deactivate: controlFunctions.interactive.deactivateErase,
    children: [
      {
        'path': 'option-panels/erase'
      }
    ]
  },
  {
    'id': uuid.v1(),
    'name': 'Bend',
    'active': false,
    'modal': true,
    'type': 'boolean',
    'icon': 'fa-coffee',
    'locations': [
      {
        'name': 'toolbar',
        'path': 'toolbar/primary'
      }
    ],
    'activate': controlFunctions.boolean.activate,
    'deactivate': controlFunctions.boolean.deactivate
  },
  {
    'id': uuid.v1(),
    'name': 'Magnet',
    'active': false,
    'type': 'command',
    'icon': 'fa-magnet',
    'locations': [
      {
        'name': 'toolbar',
        'path': 'toolbar/primary'
      }
    ]
  }
];