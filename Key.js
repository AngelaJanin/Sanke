const KEY = {
  _pressed : new Map(),

  LEFT : "ArrowLeft",
  RIGHT : "ArrowRight",
  UP : "ArrowUp",
  DOWN : "ArrowDown",

  isPressed: function(key) {
    return this._pressed.get(key);
  },
  onKeyDown: function(key) {
    this._pressed.set(key, true);
  },
  onKeyUp: function(key) {
    this._pressed.delete(key);
  }
}

export default KEY;
