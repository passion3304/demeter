let React = require('react')
let BaseComponent = require('../base-component.react')
let classNames = require('classnames')

class OptionPanel extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let OptionPanelStyles = classNames({
      'panel-hide' : !this.props.componentData.active,
      'panel-show' : this.props.componentData.active,
      'panel' : true,
      'panel-default': true,
      'option-panel': true
    })

    return (
      <div className={OptionPanelStyles}>
        <h1>{this.props.componentData.displayName}</h1>
        <div className="option-panel-widgets">
          {this.props.childComponents}
        </div>
      </div>
    )
  }
}

export default BaseComponent(OptionPanel)