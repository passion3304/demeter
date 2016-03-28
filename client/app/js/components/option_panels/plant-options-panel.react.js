const React = require('react')
const ApplicationActions = require('../../actions/application-actions')
const ApplicationStore = require('../../stores/application-store')
const Widgets = require('../widgets/widgets-index')
const Button = Widgets.Button
const classNames = require('classnames')
const uuid = require('node-uuid')


class PlantOptionsPanel extends React.Component{

  constructor(props) {
    super(props)
  }

  render() {


    return (
      <div>
        <Button bsStyle="primary">
          <i className="fa fa-plus" />
        </Button>
      </div>
    )


  }

}

export default PlantOptionsPanel