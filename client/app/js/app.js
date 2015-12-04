var React = require('react');
var ReactDOM = require('react-dom');
var ApplicationStore = require('./stores/application-store');
var ApplicationActions = require('./actions/application-actions');
var Application = require('./components/application.react');
var Viewport = require('./components/viewport.react');

ReactDOM.render(
  <div>
    <Application />
  </div>,
  document.getElementById('app-container')
);

ApplicationActions.startApp();