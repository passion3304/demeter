var uuid = require('node-uuid');

module.exports = {
  commands: [
    {
      id:   uuid.v1(),
      name: 'plant',
      type: 'interactive',
      optionPanel: true
    },
    {
      id:   uuid.v1(),
      name: 'erase',
      type: 'interactive',
      optionPanel: true
    },
    {
      id:   uuid.v1(),
      name: 'electrify',
      type: 'interactive',
      optionPanel: true
    },
    {
      id:   uuid.v1(),
      name: 'invert',
      type: 'boolean'
    },
    {
      id:   uuid.v1(),
      name: 'clear_scene',
      type: 'instant'
    }
  ],


  ui: {
    components: {
        toolbars: [
          {
            id:         uuid.v1(),
            name:       'primary-toolbar',
            type:       'toolbar',
            reactClass: 'Toolbar',
            children:  [
              {
                id:       uuid.v1(),
                name:     'Create plant',
                type:     'button',
                command:  'plant',
                icon:     'fa-tree'
              },
              {
                id:       uuid.v1(),
                name:     'Eraser',
                type:     'button',
                command:  'erase',
                icon:     'fa-eraser'
              },
              {
                id:       uuid.v1(),
                name:     'Electrify',
                type:     'button',
                command:  'electrify',
                icon:     'fa-bolt'
              },
              {
                id:       uuid.v1(),
                name:     'Invert',
                type:     'button',
                command:  'invert',
                icon:     'fa-rebel'
              },
              {
                id:       uuid.v1(),
                name:     'Clear scene',
                type:     'button',
                command:  'clear_scene',
                icon:     'fa-trash'
              }
            ]
          }
        ],
      menus: [
        {
          id:           uuid.v1(),
          name:         'primary-menu',
          type:         'menu',
          reactClass:   'Menu',
          children: [
            {
              id: uuid.v1(),
              name: 'file',
              displayName: 'File',
              type: 'top-menu',
              children: [
                {
                  id: uuid.v1(),
                  name: 'new',
                  displayName: 'New',
                  type: 'menu-item'
                },
                {
                  id: uuid.v1(),
                  name: 'open',
                  displayName: 'Open',
                  type: 'menu-item'
                },
                {
                  id: uuid.v1(),
                  name: 'open_recent',
                  displayName: 'Open Recent',
                  type: 'sub-menu'
                }
              ]
            },
            {
              id: uuid.v1(),
              name: 'tools',
              displayName: 'Tools',
              type: 'top-menu',
              children: [
                {
                  id: uuid.v1(),
                  name: 'plant',
                  displayName: 'Create plant',
                  type: 'menu-item',
                  command: 'plant',
                  active: false
                },
                {
                  id: uuid.v1(),
                  name: 'eraser',
                  displayName: 'Eraser',
                  type: 'menu-item',
                  command: 'erase',
                  active: false
                },
                {
                  id: uuid.v1(),
                  name: 'electrify',
                  displayName: 'Electrify',
                  type: 'menu-item',
                  command: 'electrify',
                  active: false
                }
              ]
            },
            {
              id: uuid.v1(),
              name: 'help',
              displayName: 'Help',
              type: 'top-menu',
              children: [
                {
                  id: uuid.v1(),
                  name: 'open_help',
                  displayName: 'Open Help',
                  type: 'menu-item'
                }
              ]
            }
          ]
        }
      ],
      optionPanels: [
        {
          id: uuid.v1(),
          name: 'plant-options',
          type: 'option-panel',
          reactClass: 'OptionPanel',
          parentCommand: 'plant',
          displayName: 'Plant options'
        },
        {
          id: uuid.v1(),
          name: 'erase-options',
          type: 'option-panel',
          reactClass: 'OptionPanel',
          parentCommand: 'erase',
          displayName: 'Eraser options'
        },
        {
          id: uuid.v1(),
          name: 'electrify-options',
          type: 'option-panel',
          reactClass: 'OptionPanel',
          parentCommand: 'electrify',
          displayName: 'Electrify options'
        }
      ]
    }
  }
};