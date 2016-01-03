let React = require('react')
let ApplicationActions = require('../actions/application-actions')
let ApplicationStore = require('../stores/application-store')
let Widgets = require('./widgets/widgets-index')
let classNames = require('classnames')

let Toolbar = React.createClass({

  getInitialState: function() {
    return {}
  },

  componentDidMount: function() {
    ApplicationStore.addChangeListener(this.onChange)
  },


  componentWillUnmount: function() {
    ApplicationStore.removeChangeListener(this.onChange)
  },

  render: function() {
    let self = this
    let children = []
    let toolbarStyle = classNames(self.props.componentData.classNames)
    let Button = Widgets.Button
    let ButtonGroup = Widgets.ButtonGroup

    if (typeof this.props.componentData.children !== 'undefined') {
      this.props.componentData.children.map((child) => {
        children.push(child)
      })
    }

    return (
      <div className={toolbarStyle}>
        <ButtonGroup vertical block>
          {children.map(function(child, i) {

            let buttonClass = classNames({
              'active': child.active
            })

            return (
              <Button key={child.id} className={buttonClass} bsStyle="primary"
                  onClick={self.handleClick.bind(null, child.id)}>
                <i className={"fa " + child.icon} />
              </Button>
            )
          })}
        </ButtonGroup>
      </div>
    )

  },

  handleClick: function(id) {
    ApplicationActions.click({
      'targetID' : id
    })
  },


  onChange: function() {
  }
})


module.exports = Toolbar