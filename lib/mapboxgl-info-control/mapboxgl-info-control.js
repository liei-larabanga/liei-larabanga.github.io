/**
 * Adds a Info control to a Mapbox GL map
 * 
 * @name InfoControl
 * @class mapboxgl.InfoControl
 * @extends mapboxgl
 */
mapboxgl.InfoControl = function(opts) {
  this._opts = opts || {};
}

/**
 * Add this Info control to the specified map.
 *
 * @param {mapboxgl.Map} map
 * @returns {html element} control container
 */
mapboxgl.InfoControl.prototype.onAdd = function(map) {
  this._map = map;
  this._container = document.createElement('div');
  this._container.className = 'mapboxgl-ctrl-group mapboxgl-ctrl mapboxgl-ctrl-info';
  
  if (this._opts.contents) {
    for (var i=0; i < this._opts.contents.length; i++) {
      var content = this._opts.contents[i]; // content: [ <html tag>, <innerHtmk> [, <class>] ]
      var classHtml = content[2] ? ' class="'+ content[2] +'"' : '';
      //var d1 = document.getElementById('one');

      this._container.insertAdjacentHTML('beforeend', '<'+ content[0] + classHtml +'>'+ content[1] +'</'+ content[0] +'>');
    }
  }

  return this._container;
}

/**
 * Removes this Info control from the map.
 */
mapboxgl.InfoControl.prototype.onRemove = function() {
  this._container.parentNode.removeChild(this._container);
  this._map = undefined;
}