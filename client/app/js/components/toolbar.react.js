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
      <ButtonGroup vertical block>
        {this.props.childComponents}
      </ButtonGroup>
    )
  }
}



export default BaseComponent(Toolbar)