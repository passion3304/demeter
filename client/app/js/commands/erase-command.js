const ViewportActions = require('../actions/viewport-actions')

var eraseCommand = function() {
  return {
    activate: function() {

    },

    deactivate: function() {

    },

    handleClick: function(action) {
      setTimeout(() => {
        ViewportActions.destroyObject({
          id: action.targetID
        })
      }, 1)
    }
  }
};

module.exports = eraseCommand();