let React = require('react')
let ReactDOM = require('react-dom')
let ApplicationStore = require('./stores/application-store')
let ApplicationActions = require('./actions/application-actions')
let Viewport = require('./components/viewport.react')

import Application from './components/application.react'

ReactDOM.render(
  <div>
    <Application />
  </div>,
  document.getElementById('app-container')
)

ApplicationActions.startApp()