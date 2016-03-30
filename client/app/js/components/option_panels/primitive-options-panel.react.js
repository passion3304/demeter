const React = require('react')
const ApplicationActions = require('../../actions/application-actions')
const ApplicationStore = require('../../stores/application-store')
import Widgets from '../widgets/widgets-index'
const classNames = require('classnames')
const Validate = require('../../lib/validate')
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
          value: parameter.defaultValue,
          type: parameter.type
        })
      })

      return parameters
    }

    this.state = {
      activeControl: 0,
      controls: controls
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  render() {
    let controls = this.props.controls

    return (
      <Widgets.Well className="option-panel-contents">
        <Widgets.Tabs activeKey={this.state.activeControl} onSelect={this.handleControlSelection.bind(this)}>
        {controls.map((control, i) => {
          return (
            <Widgets.Tab key={i} eventKey={i} title={control.name}>
              {control.parameters.map((parameter, j) => {
                if (parameter.type === 'natural' || parameter.type === 'number') {

                  return (
                    <Widgets.Input key={j} type="number" name={j} label={parameter.displayName}
                                   value={this.state.controls[i].parameters[j].value}
                                   onChange={this.handleParameterChange.bind(this)}
                                   onBlur={this.handleLossOfFocus.bind(this)}
                                   onKeyDown={this.handleKeyDown.bind(this)}
                                   />
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

    // doesn't handle the minus symbol that well for specifying negative numbers

    let controls = this.state.controls
    let value = event.target.value
    console.log(value)
    let type = controls[this.state.activeControl].parameters[event.target.name].type

    if (!value) {
      controls[this.state.activeControl].parameters[event.target.name].value = 0
      this.setState({
        controls: controls
      })
    }

    if (value == '-') {
      console.log('negative')
    }


    if (Validate.validate(type, value)) {
      controls[this.state.activeControl].parameters[event.target.name].value = Number(value)
      this.setState({
        controls: controls
      })
    } else {
      return false
    }
  }

  handleLossOfFocus(event) {
    //console.log('leaving focus')
  }

  handleKeyDown(event) {  // look into https://github.com/nkbt/react-debounce-input
    console.log('key press!')
  }
}

export default PrimitiveOptionsPanel