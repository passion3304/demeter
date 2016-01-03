let React = require('react')
let ApplicationStore = require('../stores/application-store')
let reactContainerClasses = require('./react-container-class-index')
let _ = require('lodash')


export default class Application extends React.Component {

  constructor(props) {
    super(props)
    this.state = { containerComponents: {} }
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    ApplicationStore.addChangeListener(this.onChange)
  }

  componentWillUnmount() {
    ApplicationStore.removeChangeListener(this.onChange)
  }

  render() {
    if (!ApplicationStore.appLoaded()) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )

    } else {
      let containerComponents = this.state.containerComponents
      let componentsToRender = []

      // get all top level component types like toolbars, viewport, panels, etc.
      _.forEach(containerComponents, (component) => { // TO DO: use filter here
        if (component.visible) {
          componentsToRender.push(component)
        }
      })

      // render each component in turn using a dynamic component name
      return (
        <div> {componentsToRender.map((componentToRender, i) => {
          let ComponentReactClass = reactContainerClasses[componentToRender.reactClass]
          return (
            <div key={i}>
              <ComponentReactClass componentData={componentToRender} />
            </div>
          )
        })}
        </div>
      )
    }
  }

  temp() {
    let containerComponents = this.state.containerComponents
    let componentsToRender = []

    // get all top level component types like toolbars, viewport, panels, etc.
    _.forEach(containerComponents, (component) => { // TO DO: use filter here
      if (component.visible) {
        componentsToRender.push(component)
      }
    })

    // render each component in turn using a dynamic component name
    return (
      <div> {componentsToRender.map((componentToRender, i) => {
        let ComponentReactClass = reactContainerClasses[componentToRender.reactClass]
        return (
          <div key={i}>
            <ComponentReactClass componentData={componentToRender} />
          </div>
        )
      })}
      </div>
    )
  }

  onChange() {
    this.setState({
      containerComponents: ApplicationStore.ui.getContainerComponents()
    })
  }
}