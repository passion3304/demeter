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
          extraProps: [
            {
              name: 'bsStyle',
              value: 'primary'
            }
          ],
          icon:     {
            'fa-tree': true
          }
        },
        {
          name:     'Eraser',
          type:     'button',
          command:  'erase',
          reactClass: 'Button',
          extraProps: [
            {
              name: 'bsStyle',
              value: 'primary'
            }
          ],
          icon:     {
            'fa-eraser': true
          }
        },
        {
          name:     'Electrify',
          type:     'button',
          command:  'electrify',
          reactClass: 'Button',
          extraProps: [
            {
              name: 'bsStyle',
              value: 'primary'
            }
          ],
          icon:     {
            'fa-bolt': true
          }
        },
        {
          name:     'Invert',
          type:     'button',
          command:  'invert',
          reactClass: 'Button',
          extraProps: [
            {
              name: 'bsStyle',
              value: 'primary'
            }
          ],
          icon:     {
            'fa-rebel': true
          }
        },
        {
          name:     'Clear scene',
          type:     'button',
          command:  'clear_scene',
          reactClass: 'Button',
          extraProps: [
            {
              name: 'bsStyle',
              value: 'primary'
            }
          ],
          icon:     {
            'fa-trash': true
          }
        }
      ]
    }
    //{
    //  name:         'secondary-toolbar',
    //  type:         'toolbar',
    //  reactClass:   'Toolbar',
    //  classNames:   {
    //    'toolbar':                true,
    //    'secondary-toolbar':      true
    //  }
    //}
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
          reactClass: 'NavDropdown',
          extraProps: [
            {
              name: 'title',
              value: 'File'
            }
          ],
          children: [
            {
              name: 'new',
              displayName: 'New',
              templateText: 'New',
              type: 'menu-item',
              reactClass: 'MenuItem'
            },
            {
              name: 'open',
              displayName: 'Open',
              templateText: 'Open',
              type: 'menu-item',
              reactClass: 'MenuItem'
            },
            {
              name: 'open_recent',
              displayName: 'Open Recent',
              templateText: 'Open Recent',
              type: 'sub-menu',
              reactClass: 'MenuItem'
            }
          ]
        },
        {

          name: 'tools',
          displayName: 'Tools',
          type: 'top-menu',
          reactClass: 'NavDropdown',
          extraProps: [
            {
              name: 'title',
              value: 'Tools'
            }
          ],
          children: [
            {
              name: 'plant',
              templateText: 'Create plant',
              displayName: 'Create plant',
              type: 'menu-item',
              reactClass: 'MenuItem',
              command: 'plant'
            },
            {
              name: 'eraser',
              templateText: 'Eraser',
              displayName: 'Eraser',
              type: 'menu-item',
              reactClass: 'MenuItem',
              command: 'erase'
            },
            {
              name: 'electrify',
              templateText: 'Electrify',
              displayName: 'Electrify',
              type: 'menu-item',
              reactClass: 'MenuItem',
              command: 'electrify'
            },
            {
              reactClass: 'MenuItem',
              type: 'divider',
              extraProps: [
                {
                  name: 'divider',
                  value : true
                }
              ]
            },
            {
              name: 'invert',
              templateText: 'Invert',
              displayName: 'Invert',
              type: 'menu-item',
              reactClass: 'MenuItem',
              command: 'invert'
            },
            {
              reactClass: 'MenuItem',
              type: 'divider',
              extraProps: [
                {
                  name: 'divider',
                  value : true
                }
              ]
            },
            {
              name: 'clear_scene',
              displayName: 'Clear Scene',
              templateText: 'Clear Scene',
              type: 'menu-item',
              reactClass: 'MenuItem',
              command: 'clear_scene'
            }
          ]
        },
        {
          name: 'help',
          displayName: 'Help',
          type: 'top-menu',
          reactClass: 'NavDropdown',
          extraProps: [
            {
              name: 'title',
              value: 'Help'
            }
          ],
          children: [
            {
              name: 'open_help',
              templateText: 'Open Help',
              displayName: 'Open Help',
              type: 'menu-item',
              reactClass: 'MenuItem'
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
  ]
  //statusIndicators: [
  //  {
  //    name: 'current-interactive-command',
  //    type: 'status-indicator',
  //    reactClass: 'CurrentInteractiveCommand',
  //    displayName: 'Current interactive command',
  //    active: 'true'
  //  }
  //]
};