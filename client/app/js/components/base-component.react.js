let React = require('react')
let ApplicationStore = require('../stores/application-store')
let ApplicationActions = require('../actions/application-actions')
let Widgets = require('./widgets/widgets-index')
let classNames = require('classnames')
let _ = require('lodash')

export default function BaseComponent(SubComponent) {
  class Base extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      let self = this
      let style = { className: classNames(this.props.componentData.classNames) }

      function icon(component) {
        if (typeof component.icon !== 'undefined') {
          component.icon['fa'] = true
          let iconStyle = classNames(component.icon)
          return (
            <i className={iconStyle} />
          )
        } else {
          return false
        }
      }

      function text(component) {
        if (typeof component.templateText !== 'undefined') {
          return component.templateText
        } else {
          return false
        }
      }

      function childComponents(componentData) {
        let children = []

        if (typeof componentData.children !== 'undefined') {
          componentData.children.map((child) => {
            children.push(child)
          })
        } else {
          return false
        }

        return children.map((child, i) => {
          let ChildReactClass = Widgets[child.reactClass]
          let childClassNames = {
            'active': child.active
          }

          if (typeof child.classNames !== 'undefined') {
            _.assign(childClassNames, child.classNames)
          }
          let childStyle = classNames(childClassNames)

          let bsStyle = {}
          if (typeof child.bsStyle !== 'undefined') {
            bsStyle = child.bsStyle
          }

          let extraProps = {}

          if (typeof child.extraProps !== 'undefined') {
            _.forEach(child.extraProps, (prop) => {
              extraProps[prop.name] = prop.value
            })
          }

          return (
            <ChildReactClass key={i} {...extraProps}
                id={child.id} className={childStyle}
                onClick={self.handleClick.bind(null, child.id)}>
              {text(child)}
              {icon(child)}
              {childComponents(child)}
            </ChildReactClass>
          )
        })
      }

      return (
        <div>
          <SubComponent {...this.props} className={style}
                          childComponents={childComponents(this.props.componentData)} />
        </div>
      )
    }

    handleClick(id) {
      ApplicationActions.click({
        'targetID' : id
      })
    }

  }

  return Base
}