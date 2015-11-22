var controlFunctions = function() {

  return {
    command: {

    },

    boolean: {
      
      activate: function() {
        this.active = true;
      },

      deactivate: function() {
        this.active = false;
      }
    },

    interactive: {

      activatePlantControl: function() {
        this.active = true;
        this.mouseDownFunction = function(event) {
          console.log('click');
        };

        document.getElementById('viewport')
          .addEventListener('mousedown', this.mouseDownFunction);
      },

      deactivatePlantControl: function() {
        this.active = false;
        document.getElementById('viewport')
          .removeEventListener('mousedown', this.mouseDownFunction);
      },

      activateErase: function() {
        this.active = true;
      },

      deactivateErase: function() {
        this.active = false;
      }
    }
  }
};

module.exports = controlFunctions();