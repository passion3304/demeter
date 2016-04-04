let React = require('react')
let BaseComponent = require('../base-component.react')
import OptionPanels from './option-panel-index'
let classNames = require('classnames')
let _ = require('lodash')

class OptionPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentInteractiveSubcommand: false
    }
  }

  render() {
    let OptionPanelStyles = classNames({
      'panel-hide' : !this.props.componentData.active,
      'panel-show' : this.props.componentData.active,
      'panel' : true,
      'panel-default': true,
      'option-panel': true
    })

    let OptionPanelReactClass = OptionPanels[this.props.componentData.reactSubClass]

    return (
      <div className={OptionPanelStyles}>
        <h1>{this.props.componentData.displayName}</h1>
        <OptionPanelReactClass componentData={this.props.componentData} />
      </div>
    )
  }
}

class SubCommand extends  React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        Hi
      </div>
    )
  }
}

export default BaseComponent(OptionPanel)