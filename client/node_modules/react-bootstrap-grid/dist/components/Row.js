module.exports = function (React) {
  return React.createClass({
    displayName: 'Row',
    propTypes: {
      className: React.PropTypes.string
    },
    getDefaultProps: function () {
      // Return an empty class name as default
      return {
        className: ''
      }
    },
    render: function () {
      return (
        React.createElement("div", {className:  'row ' + this.props.className}, 
          /* Render children */ 
           this.props.children
        )
      )
    }
  });
}
