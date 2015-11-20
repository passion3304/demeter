var uuid = require('node-uuid');

module.exports = [
  {
    "id": uuid.v1(),
    "name": "Create plant",
    "active": false,
    "type": 'modal',
    "icon": "fa-plus",
    "locations": [
      {
        "name": "toolbar",
        "path": "primary"
      }
    ]
  },
  {
    "id": uuid.v1(),
    "name": "Erase",
    "active": false,
    "type": "modal",
    "icon": "fa-minus",
    "locations": [
      {
        "name": "toolbar",
        "path": "primary"
      }
    ]
  },
  {
    "id": uuid.v1(),
    "name": "Bend",
    "active": false,
    "modal": true,
    "type": "boolean",
    "icon": "fa-coffee",
    "locations": [
      {
        "name": "toolbar",
        "path": "primary"
      }
    ]
  },
  {
    "id": uuid.v1(),
    "name": "Magnet",
    "active": false,
    "type": "command",
    "icon": "fa-magnet",
    "locations": [
      {
        "name": "toolbar",
        "path": "primary"
      }
    ]
  }
];