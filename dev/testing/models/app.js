var Models  =   require('./models');

var myApple = new Models.Apple(2);
var myOrange = new Models.Orange(4);

console.log('apple: ' + myApple.getID());
console.log('orange: ' + myOrange.getID());