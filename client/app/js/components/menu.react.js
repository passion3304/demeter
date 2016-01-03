let React = require('react')
let Widgets = require('./widgets/widgets-index')
import BaseComponent from './base-component.react'

class Menu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let Navbar =        Widgets.Navbar
    let Nav =           Widgets.Nav

    return (
      <Navbar fixedTop={true}>
        <Nav>
          {this.props.childComponents}
        </Nav>
      </Navbar>
    )
  }
}

export default BaseComponent(Menu)