/**
 *
 *                          ui.js
 *
 *    This module is the controller for the entire interface, coordinating actions with state, viewport with other
 *    UI elements.  It's like a layer between the Application store and the layer of other interface elements like
 *    the toolbar and the viewport.
 *
 *    Clicks and other actions in the UI are first dispatched to the Application Store, which then brokers the event
 *    to this module.
 */

var commands = require('./commands')
var components = require('../components/component-index')
var uuid = require('node-uuid')
var _ = require('lodash')
var q = require('q')


export default class {
  constructor(settings) {
    this.state = {}
    this.state.commands = initializeCommands(commands)
    this.state.containerComponents = []
    this.state.components = initializeComponents(components, this.state.containerComponents)
    this.state.currentInteractiveCommand = 'none'
  }

  getCommands() {
    return this.state.commands
  }

  getContainerComponents() {
    return this.state.containerComponents
  }

  getComponents() {
    return this.state.components
  }

  getComponentByID(id) {
    return findByID(this.state.components, id)
  }

  click(action) {
    let deferred = q.defer()

    if (action.viewport) { // click 3D object
      clickViewport(action, this.state)
      deferred.resolve()

    } else {  // click component
      let component = findByID(this.state.components, action.targetID)
      if (component && typeof component.command !== 'undefined') {

        let command = findByName(this.state.commands, component.command)

        switch (command.type) {
          case 'interactive':
            toggleActiveState(component, this.state)
            deferred.resolve({ currentInteractiveCommand: this.state.currentInteractiveCommand })
            break

          case 'boolean':
            toggleActiveState(component, this.state)
            deferred.resolve()
            break

          case 'instant':
            activate(component, this.state)
            deactivate(component, this.state)
            deferred.resolve()
            break

          default:
          // no op
        }
      }
    }
    
    return deferred.promise
  }
}

function initializeCommands(commands) {

  _.forEach(commands, (command) => {
    let commandDefaults = {
      id: uuid.v1()
    }
    _.defaults(command, commandDefaults)
    _.assign(command, command.command)    // move the module commands one level up so you don't
                                          // have to keep using command.command
  })

  return commands
}

function initializeComponents(components, containerComponents) {

  let processedComponents = []

  _.forEach(components, category => {

    function initialize(component) {
      let componentDefaults = {
        id:       uuid.v1(),
        visible:  true,
        active:   false
      }
      _.defaults(component, componentDefaults)
      processedComponents.push(component)
      initializeChildren(component)
    }

    function initializeChildren(parent) {
      let hasChildren = typeof parent.children !== 'undefined'
      if (!hasChildren) {
        return
      } else {
        _.forEach(parent.children, child => {
          initialize(child)
        })
      }
    }

    _.forEach(category, component => {
      initialize(component)
      containerComponents.push(component)    // just top level components
    })
  })

  return processedComponents
}

function findByID(collection, id) {
  return _.find(collection, { id : id })
}

function findByName(collection, name) {
  return _.find(collection, { name : name })
}

function findDependentsByCommand(element, state) {
  if (typeof element.command === 'undefined') {
    return false
  } else {
    let command = findByName(state.commands, element.command)
    return _.filter(state.components, (component) => {
      if (component.hasOwnProperty('parentCommand')) {
        return component.parentCommand === command.name
      } else {
        return false
      }
    })
  }
}

function activate(component, state) {
  let otherComponents = _.reject(state.components, { id: component.id })
  let command = findByName(state.commands, component.command)

  component.active = true
  state.currentInteractiveCommand = command

  _.forEach(otherComponents, (otherComponent) => {

    if (command && otherComponent.hasOwnProperty('command')) {
      let otherCommand = findByName(state.commands, otherComponent.command)

      // only one interactive command at a time
      if (command.type === 'interactive' && otherCommand.type === 'interactive'
          && otherComponent.active) {
        deactivate(otherComponent, state)
      }
    }
  })

  _.forEach(findDependentsByCommand(component, state), (dependent) => {
    dependent.active = true
  })

  let otherComponentsWithSameCommand = _.find(otherComponents, { command: component.command })
  if (Array.isArray(otherComponentsWithSameCommand)) {
    _.forEach(otherComponentsWithSameCommand, (otherComponent) => {
      otherComponent.active = true
    })
  } else if (typeof otherComponentsWithSameCommand !== 'undefined') {
    otherComponentsWithSameCommand.active = true
  } else {
    return
  }

  if (typeof command.command !== 'undefined') {
    command.activate()
  } else {
    return
  }
}

function deactivate(component, state) {
  let otherComponents = _.reject(state.components, { id: component.id })
  var command = findByName(state.commands, component.command)

  component.active = false

  _.forEach(findDependentsByCommand(component, state), (dependent) => {
    deactivate(dependent, state)
  })

  let otherComponentsSameCommand = _.find(otherComponents, { command: component.command })
  if (command && Array.isArray(otherComponentsSameCommand)) {
    _.forEach(otherComponentsSameCommand, (otherComponent) => {
      otherComponent.active = false
    })
  } else if (otherComponentsSameCommand) {
    otherComponentsSameCommand.active = false
  } else {
    return
  }

  if (!(_.find(state.components, {'active': true}))) {    // we're deactivating without toggling
                                                          // to another command
    state.currentInteractiveCommand = 'none'
  }

  if (typeof command.command !== 'undefined') {
    command.deactivate()
  } else {
    return
  }

}

function toggleActiveState(component, state) {

  if (!component.active) {
    activate(component, state)
  } else {
    deactivate(component, state)
  }
}

function clickViewport(action, state) {
  if (state.currentInteractiveCommand === 'none') {
    return
  } else {
    if (typeof state.currentInteractiveCommand.handleClick === 'undefined') {
      throw new Error('command is missing handleClick function')
    } else {
      state.currentInteractiveCommand.handleClick(action)
    }
  }
}
