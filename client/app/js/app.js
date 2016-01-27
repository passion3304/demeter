let React = require('react')
let ReactDOM = require('react-dom')
let ApplicationActions = require('./actions/application-actions')
import Viewport from './components/viewport.react'

import Application from './components/application.react'

ReactDOM.render(
  <div>
    <Application />
  </div>,
  document.getElementById('app-container')
)

ApplicationActions.startApp()