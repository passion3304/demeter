var React = require('react');
var ReactDOM = require('react-dom');
var Toolbar = require('./components/toolbar.react');

ReactDOM.render(
  <div>
    <Toolbar></Toolbar>
  </div>,
  document.getElementById('app-container')
);