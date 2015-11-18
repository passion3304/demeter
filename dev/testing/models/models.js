var Apple = require('./apple');
var Orange = require('./orange');

function Models() {
  return {
    x: 42,
    double: function(x) {
      return x * 2;
    },
    Apple: Apple,
    Orange: Orange
  }
}


module.exports = new Models();