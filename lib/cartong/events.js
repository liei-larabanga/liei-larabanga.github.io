var CartONG = CartONG || {};

CartONG.Events = function() {
  this.listeners = {};
};

CartONG.Events.prototype.on = function(type, fn, scope) {
  if (!fn) {
    console.log('Event listener for ' + type + ' is undefined.');
    return;
  }
  (this.listeners[type] || (this.listeners[type] = [])).push([fn, scope]);
};

CartONG.Events.prototype.off = function(type, fn) {
  this.listeners[type] = (this.listeners[type] || []).filter(function(item) {
    return item[0] !== fn;
  });
};

CartONG.Events.prototype.emit = function(type, payload) {
  if (this.listeners[type] === undefined) {
    return;
  }
  setTimeout(function() {
    var typeListeners = this.listeners[type];
    for (var i = 0, len = typeListeners.length; i < len; i++) {
      typeListeners[i][0].call(typeListeners[i][1], payload);
    }
  }.bind(this), 0);
};

CartONG.Events.prototype.destroy = function() {
  this.listeners = {};
};
