const React = require('react')
const ApplicationActions = require('../../actions/application-actions')
const ApplicationStore = require('../../stores/application-store')
const Widgets = require('../widgets/widgets-index')
const Button = Widgets.Button
const classNames = require('classnames')

class PrimitiveOptionsPanel extends React.Component{
  render() {
    let buttonClass = classNames({
      'btn-primary' : true
    })
    return (
      <div>
        <Button className={buttonClass}>
          <i className="fa fa-circle" />
        </Button>
      </div>
    )
  }
}

export default PrimitiveOptionsPanel