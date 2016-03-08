module.exports = function (React) {
  return React.createClass({
    displayName: 'Block',
    propTypes: {
      extraSmall: React.PropTypes.bool,
      small: React.PropTypes.bool,
      medium: React.PropTypes.bool,
      large: React.PropTypes.bool
    },
    getDefaultProps: function () {
      return {
        extraSmall: false,
        small: false,
        medium: false,
        large: false
      };
    },
    getClassName: function () {
      var className = [];

      if (this.props.extraSmall) {
        className.push('visible-xs-block');
      }
      if (this.props.small) {
        className.push('visible-sm-block');
      }
      if (this.props.medium) {
        className.push('visible-md-block');
      }
      if (this.props.large) {
        className.push('visible-lg-block');
      }

      return className.join(' ');
    },
    render: function() {
      return (
        <div className={ 'clearfix ' + this.getClassName() } />
      )
    }
  });
};
