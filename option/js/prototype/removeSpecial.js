String.prototype.removeSpecial = function () {
  return this.replace(/[() \[\]{}!@#$%^&*]/g, '');
}

String.prototype.removeQuata = function () {
  return this.replace(/['"]/g, '').term();
}
