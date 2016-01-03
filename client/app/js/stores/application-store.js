let AppDispatcher = require('../dispatcher/app-dispatcher')
let EventEmitter = require('events').EventEmitter
let ApplicationConstants = require('../constants/application-constants')
let SettingsStore = require('./settings-store')
let assign = require('object-assign')   // probably can use lodash version
let _ = require('lodash')

import UI from './ui'

const CHANGE_EVENT = 'change'

let ApplicationStore = assign({}, EventEmitter.prototype, {

  state: {
    settings: {},
    loaded: false,
    currentInteractiveCommand: {}
  },

  ui: {},

  emitChange: function () {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  dispatchToken: AppDispatcher.register(function (action) {

    switch (action.actionType) {
      case ApplicationConstants.START_APP:
        ApplicationStore.state.settings = SettingsStore.getSettings()
        ApplicationStore.state.loaded = true
        ApplicationStore.ui = new UI(ApplicationStore.state.settings)
        ApplicationStore.emitChange()
        break
      case ApplicationConstants.CLICK:
        ApplicationStore.ui.click(action.targetID)
          .then(function(newState) {
            _.assign(ApplicationStore.state, newState)
            ApplicationStore.emitChange()
          })
        break
      default:
      //no op
    }

    return true
  }),

  appLoaded: function () {
    return this.state.loaded
  },

  getCurrentInteractiveCommand: function() {
    if (typeof this.state.currentInteractiveCommand.name !== 'undefined') {
      return this.state.currentInteractiveCommand.name
    } else {
      return 'none'
    }
  }

})


module.exports = ApplicationStore