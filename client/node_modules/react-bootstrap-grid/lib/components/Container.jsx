module.exports = function (React) {
  return React.createClass({
    displayName: 'Container',
    propTypes: {
      className: React.PropTypes.string,
      fluid: React.PropTypes.bool
    },
    getDefaultProps: function () {
      return {
        className: '',
        fluid: false
      }
    },
    render: function () {
      return (
        <div className={ 'container' + (this.props.fluid ? '-fluid' : '') + ' ' + this.props.className }>
          { this.props.children }
        </div>
      )
    }
  });
}
