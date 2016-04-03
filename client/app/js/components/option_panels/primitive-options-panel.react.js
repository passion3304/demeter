const React = require('react')
const DebounceInput = require('react-debounce-input')
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

                  let validateState = function (controlIndex, parameterIndex) {
                    let controls = this.state.controls
                    let value = Number(controls[controlIndex].parameters[parameterIndex].value)
                    let type = controls[controlIndex].parameters[parameterIndex].type

                    if (Validate.validate(type, value)) {
                      return 'success'
                    } else {
                      return 'error'
                    }
                  }

                  // I don't like how the name prop is really an index -- need to rethink the way the
                  // state is structured by the structure of the component index
                  return (
                    <Widgets.Input key={j} type="number"
                                   label={parameter.displayName}
                                   defaultValue={this.state.controls[i].parameters[j].value}
                                   value={this.state.controls[i].parameters[j].value}
                                   onChange={this.handleParameterChange.bind(this, i, j)}
                                   bsStyle={validateState.call(this, i, j)}
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

  handleParameterChange(controlIndex, parameterIndex, event) {

    let controls = this.state.controls
    let value = event.target.value
    let type = controls[controlIndex].parameters[parameterIndex].type
    controls[controlIndex].parameters[parameterIndex].value = value

    this.setState({
      controls: controls
    })

    // not trying to debounce input or control this element anymore
    // instead just validate and only send to object creation THREE related methods when state values are valid
    // otherwise display red in input and just leave the object alone

    //setTimeout(() => {
    //  if (!value) {
    //    controls[this.state.activeControl].parameters[event.target.name].value = 0
    //  } else if (Validate.validate(type, value)) {
    //    controls[this.state.activeControl].parameters[event.target.name].value = Number(value)
    //  }
    //  this.setState({
    //    controls: controls
    //  })
    //}, 1000)



  }
}

export default PrimitiveOptionsPanel