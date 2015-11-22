var React = require('react');
var ReactDOM = require('react-dom');
var AppActions = require('./actions/application-actions');
var Toolbar = require('./components/toolbar.react');
var Viewport = require('./components/viewport.react');

//AppActions.appStart();

ReactDOM.render(
  <div>
    <div>
    </div>
    <div>
      <Toolbar></Toolbar>
    </div>
  </div>,
  document.getElementById('app-container')
);