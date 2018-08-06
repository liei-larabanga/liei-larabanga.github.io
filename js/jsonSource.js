var AppComponents = AppComponents || {};

$(function() {

  AppComponents.JSONSource = function (key, src) {
    if (!key || !src) { console.log ('missing parameters'); return; }
    this.key = key;
    this.src = src;
    //this.map = map;
    return this;
  }
  AppComponents.JSONSource.prototype.load = function() {
    var promise = $.Deferred();
    loadJSON(this.src)
    .done(function(json){
      this.geojson = json;
      promise.resolve(this);
    }.bind(this))
    .fail(function(err) {
      promise.resolve(this);
    }.bind(this));
    return promise;
  }
  AppComponents.JSONSource.prototype.addTo = function(map) {
    if (!this.geojson) { return; }
    this.map = map;
    this.map.addSource(this.key, {
      type: 'geojson',
      data: this.geojson
    });
  }

});