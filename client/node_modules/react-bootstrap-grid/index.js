var React = require('react');

module.exports = {
  Container: require('./dist/components/Container.js')(React),
  Column: require('./dist/components/Column.js')(React),
  Block: require('./dist/components/Block.js')(React),
  Row: require('./dist/components/Row.js')(React)
};
