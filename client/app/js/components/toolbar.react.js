let React = require('react')
let Widgets = require('./widgets/widgets-index')
import BaseComponent from './base-component.react'

class Toolbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let ButtonGroup = Widgets.ButtonGroup
    return (
      <div className="toolbar primary-toolbar" >
        <ButtonGroup vertical block>
          {this.props.childComponents}
        </ButtonGroup>
      </div>
    )
  }
}



export default BaseComponent(Toolbar)