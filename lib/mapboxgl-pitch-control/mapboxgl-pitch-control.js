mapboxgl.PitchControl = function() {}

mapboxgl.PitchControl.prototype.onAdd = function(map) {
  this._map = map;
  this._container = document.createElement('div');
  this._container.className = 'mapboxgl-ctrl-group mapboxgl-ctrl';
  
  this._container.innerHTML = '<button title="Toggle pitch" class="mapboxgl-ctrl-icon"></button>';
  //this._container.innerHTML = '<button title="Toggle pitch" class="mapboxgl-ctrl-icon">3D</button>';
  this._btn = this._container.querySelector('button');
  this._btn.className = 'mapboxgl-ctrl-icon fas fa-road';
  this._btn.onclick = this.togglePitch;

  return this._container;
}

mapboxgl.PitchControl.prototype.onRemove = function() {
  this._container.parentNode.removeChild(this._container);
  this._map = undefined;
}

mapboxgl.PitchControl.prototype.togglePitch = function() {
  var pitch = parseInt(map.getPitch());
  pitch == 60 ? pitch = 0 : pitch > 30 ? pitch = 60 : pitch = pitch + 30;
  map.easeTo({
      'pitch': pitch
  })
}
