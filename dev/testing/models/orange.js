function Orange(id) {
  this.id = id;
}

Orange.prototype.getID = function() {
  return this.id || 0;
};

module.exports = Orange;