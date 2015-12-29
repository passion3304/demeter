module.exports = {
  toolbars: [
    {
      name:       'primary-toolbar',
      type:       'toolbar',
      reactClass: 'Toolbar',
      classNames: {
        'toolbar':              true,
        'primary-toolbar':      true
      },
      children:  [
        {
          name:     'Create plant',
          type:     'button',
          command:  'plant',
          reactClass: 'Button',
          icon:     'fa-tree'
        },
        {
          name:     'Eraser',
          type:     'button',
          command:  'erase',
          reactClass: 'Button',
          icon:     'fa-eraser'
        },
        {
          name:     'Electrify',
          type:     'button',
          command:  'electrify',
          reactClass: 'Button',
          icon:     'fa-bolt'
        },
        {
          name:     'Invert',
          type:     'button',
          command:  'invert',
          reactClass: 'Button',
          icon:     'fa-rebel'
        },
        {
          name:     'Clear scene',
          type:     'button',
          command:  'clear_scene',
          reactClass: 'Button',
          icon:     'fa-trash'
        }
      ]
    },
    {
      name:         'secondary-toolbar',
      type:         'toolbar',
      reactClass:   'Toolbar',
      classNames:   {
        'toolbar':                true,
        'secondary-toolbar':      true
      }
    }
  ],
  menus: [
    {
      name:         'primary-menu',
      type:         'menu',
      reactClass:   'Menu',
      children: [
        {
          name: 'file',
          displayName: 'File',
          type: 'top-menu',
          children: [
            {
              name: 'new',
              displayName: 'New',
              type: 'menu-item'
            },
            {
              name: 'open',
              displayName: 'Open',
              type: 'menu-item'
            },
            {
              name: 'open_recent',
              displayName: 'Open Recent',
              type: 'sub-menu'
            }
          ]
        },
        {

          name: 'tools',
          displayName: 'Tools',
          type: 'top-menu',
          children: [
            {
              name: 'plant',
              displayName: 'Create plant',
              type: 'menu-item',
              command: 'plant'
            },
            {
              name: 'eraser',
              displayName: 'Eraser',
              type: 'menu-item',
              command: 'erase'
            },
            {
              name: 'electrify',
              displayName: 'Electrify',
              type: 'menu-item',
              command: 'electrify'
            },
            {
              type: 'divider'
            },
            {
              name: 'invert',
              displayName: 'Invert',
              type: 'menu-item',
              command: 'invert'
            },
            {
              type: 'divider'
            },
            {
              name: 'clear_scene',
              displayName: 'Clear Scene',
              type: 'menu-item',
              command: 'clear_scene'
            }
          ]
        },
        {
          name: 'help',
          displayName: 'Help',
          type: 'top-menu',
          children: [
            {
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
      name: 'plant-options',
      type: 'option-panel',
      reactClass: 'OptionPanel',
      reactSubClass: 'PlantOptionsPanel',
      parentCommand: 'plant',
      displayName: 'Plant options',
      children: [
        {
          name: 'airbrushToggle',
          displayName: 'Airbrush',
          type: 'button',
          command: 'airbrush',
          reactClass: 'Button',
          classNames: {
            'btn': true,
            'btn-success': true
          },
          icon: {
            'fa-paper-plane-o': true
          }
        }
      ]
    },
    {
      name: 'erase-options',
      type: 'option-panel',
      reactClass: 'OptionPanel',
      reactSubClass: 'EraseOptionsPanel',
      parentCommand: 'erase',
      displayName: 'Eraser options'
    },
    {
      name: 'electrify-options',
      type: 'option-panel',
      reactClass: 'OptionPanel',
      reactSubClass: 'ElectrifyOptionsPanel',
      parentCommand: 'electrify',
      displayName: 'Electrify options'
    }
  ],
  statusIndicators: [
    {
      name: 'current-interactive-command',
      type: 'status-indicator',
      reactClass: 'CurrentInteractiveCommand',
      displayName: 'Current interactive command',
      active: 'true'
    }
  ]
};