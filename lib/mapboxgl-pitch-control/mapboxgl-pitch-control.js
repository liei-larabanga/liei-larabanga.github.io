function PitchControl() {}

PitchControl.prototype.onAdd = function(map) {
  this._map = map;
  this._container = document.createElement('div');
  this._container.className = 'mapboxgl-ctrl-group mapboxgl-ctrl';
  this._container.innerHTML = '<button id="bt_pitch" title="Pitch" class="mapboxgl-ctrl-icon fas fa-road"></button>';

  var button = this._container.querySelector('button');
  button.onclick = this.switchPitch;

  return this._container;
}

PitchControl.prototype.onRemove = function() {
  this._container.parentNode.removeChild(this._container);
  this._map = undefined;
}

PitchControl.prototype.switchPitch = function() {
  var pitch = parseInt(map.getPitch());
  pitch == 60 ? pitch = 0 : pitch = pitch + 30;
  map.easeTo({
      'pitch': pitch
  })
}
