module.exports = function (React) {
  return React.createClass({
    displayName: 'Column',
    propTypes: {
      className: React.PropTypes.string,
      extraSmall: React.PropTypes.number,
      extraSmallOffset: React.PropTypes.number,
      extraSmallPush: React.PropTypes.number,
      extraSmallPull: React.PropTypes.number,
      small: React.PropTypes.number,
      smallOffset: React.PropTypes.number,
      smallPush: React.PropTypes.number,
      smallPull: React.PropTypes.number,
      medium: React.PropTypes.number,
      mediumOffset: React.PropTypes.number,
      mediumPush: React.PropTypes.number,
      mediumPull: React.PropTypes.number,
      large: React.PropTypes.number,
      largeOffset: React.PropTypes.number,
      largePush: React.PropTypes.number,
      largePull: React.PropTypes.number
    },
    getDefaultProps: function () {
      return {
        className: '',
        extraSmall: 0,
        extraSmallOffset: 0,
        extraSmallPush: 0,
        extraSmallPull: 0,
        small: 0,
        smallOffset: 0,
        smallPush: 0,
        smallPull: 0,
        medium: 0,
        mediumOffset: 0,
        mediumPush: 0,
        mediumPull: 0,
        large: 0,
        largeOffset: 0,
        largePush: 0,
        largePull: 0
      }
    },
    getColumnWidths: function () {
      var colWidths = [];

      // Column widths
      if (this.props.extraSmall !== 0) {
        colWidths.push('col-xs-' + this.props.extraSmall);
      }
      if (this.props.small !== 0 && this.props.small !== this.props.extraSmall) {
        colWidths.push('col-sm-' + this.props.small);
      }
      if (this.props.medium !== 0 && this.props.medium !== this.props.small) {
        colWidths.push('col-md-' + this.props.medium);
      }
      if (this.props.large !== 0 && this.props.large !== this.props.medium) {
        colWidths.push('col-lg-' + this.props.large);
      }

      return colWidths;
    },
    getColumnOffsets: function () {
      var offsets = [];

      // Column offsets
      if (this.props.extraSmallOffset !== 0) {
        offsets.push('col-xs-offset-' + this.props.extraSmallOffset);
      }
      if (this.props.smallOffset !== 0 && this.props.smallOffset !== this.props.extraSmallOffset) {
        offsets.push('col-sm-offset-' + this.props.smallOffset);
      }
      if (this.props.mediumOffset !== 0 && this.props.mediumOffset !== this.props.smallOffset) {
        offsets.push('col-md-offset-' + this.props.mediumOffset);
      }
      if (this.props.largeOffset !== 0 && this.props.largeOffset !== this.props.mediumOffset) {
        offsets.push('col-lg-offset-' + this.props.largeOffset);
      }

      return offsets;
    },
    getColumnPush: function() {
      var pushes = [];

      if (this.props.extraSmallPush !== 0) {
        pushes.push('col-xs-push-' + this.props.extraSmallPush);
      }
      if (this.props.smallPush !== 0 && this.props.smallPush !== this.props.extraSmallPush) {
        pushes.push('col-sm-push-' + this.props.smallPush);
      }
      if (this.props.mediumPush !== 0 && this.props.mediumPush !== this.props.smallPush) {
        pushes.push('col-md-push-' + this.props.mediumPush);
      }
      if (this.props.largePush !== 0 && this.props.largePush !== this.props.mediumPush) {
        pushes.push('col-lg-push-' + this.props.largePush);
      }

      return pushes;
    },
    getColumnPull: function () {
      var pulls = [];

      if (this.props.extraSmallPull !== 0) {
        pulls.push('col-xs-pull-' + this.props.extraSmallPull);
      }
      if (this.props.smallPull !== 0 && this.props.smallPull !== this.props.extraSmallPull) {
        pulls.push('col-sm-pull-' + this.props.smallPull);
      }
      if (this.props.mediumPull !== 0 && this.props.mediumPull !== this.props.smallPull) {
        pulls.push('col-md-pull-' + this.props.mediumPull);
      }
      if (this.props.largePull !== 0 && this.props.largePull !== this.props.mediumPull) {
        pulls.push('col-lg-pull-' + this.props.largePull);
      }

      return pulls;
    },
    render: function () {
      // Create class name
      var className = [];

      // Column widths
      className = className.concat(this.getColumnWidths());

      // Column offsets
      className = className.concat(this.getColumnOffsets());

      // Get push and pull
      className = className.concat(this.getColumnPush());
      className = className.concat(this.getColumnPull());

      return (
        <div className={ className.join(' ') + ' ' + this.props.className }>
          { this.props.children }
        </div>
      )
    }
  });
}
