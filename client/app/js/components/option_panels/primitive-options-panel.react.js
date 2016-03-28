const React = require('react')
const ApplicationActions = require('../../actions/application-actions')
const ApplicationStore = require('../../stores/application-store')
import Widgets from '../widgets/widgets-index'
const classNames = require('classnames')
const _ = require('lodash')

class PrimitiveOptionsPanel extends React.Component{

  constructor(props) {
    super(props)

    let controls = []

    this.props.controls.map((control) => {
      controls.push({
        name: control.name,
        parameters: initializeParameters(control)
      })
    })

    function initializeParameters(control) {
      let parameters = []

      control.parameters.map((parameter) => {
        parameters.push({
          name: parameter.name,
          value: parameter.defaultValue
        })
      })

      return parameters
    }

    this.state = {
      activeControl: 0,
      controls: controls
    }
  }

  render() {
    let self = this
    let controls = this.props.controls

    return (
      <Widgets.Well className="option-panel-contents">
        <Widgets.Tabs activeKey={this.state.activeControl} onSelect={this.handleControlSelection.bind(this)}>
        {controls.map((control, i) => {
          return (
            <Widgets.Tab key={i} eventKey={i} title={control.name}>
              {control.parameters.map((parameter, j) => {
                if (parameter.type === 'natural') {

                  return (
                    <Widgets.Input key={j} type="number" name={j} label={parameter.displayName}
                                   value={self.state.controls[i].parameters[j].value}
                                   onChange={this.handleParameterChange.bind(this)} />
                  )
                }
              })}
            </Widgets.Tab>
          )

        })}
        </Widgets.Tabs>
      </Widgets.Well>
    )
  }

  handleControlSelection(eventKey) {
    this.setState({
      activeControl: eventKey
    })
  }

  handleParameterChange(event) {
    let controls = this.state.controls
    controls[this.state.activeControl].parameters[event.target.name].value = Number(event.target.value)
    this.setState({
      controls: controls
    })
  }
}

export default PrimitiveOptionsPanel