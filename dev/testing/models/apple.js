function Apple(id) {
  this.id = id;
}

Apple.prototype.getID = function() {
  return this.id || 0;
};

module.exports = Apple;