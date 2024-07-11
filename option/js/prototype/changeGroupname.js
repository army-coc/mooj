String.prototype.changeGroupname = function () {
  const unhypen = this.replace('-', '')
  return unhypen.slice(0, -1) + unhypen.slice(-1).toUpperCase();
}
