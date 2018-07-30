//TODO: define sidebar structure
//TODO: create event manager
//TODO: build get data from vector tile features
//TODO: create own vector tiles & styles... uff
//TODO:

var map;

$(function() {
  map = new mapboxgl.Map({
    container: 'map', // id of HTML element containing the map
    style: 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json', // Style location
    center: [-1.860, 9.218], // initial map center
    zoom: 15, // initial zoom level
    bearing: 0, // Initial rotation angle
    pitch: 0,
    hash: true // Allows storing maps position at the URL
  });

  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(new mapboxgl.ScaleControl(), 'bottom-right');
  //custom pitch control
  map.addControl(new mapboxgl.PitchControl());

  //map.addControl(new SidebarMapboxgl('sidebar'), 'top-left');
  //var sidebar = new SidebarMapboxgl('sidebar');
  var sidebar = turboSidebar('sidebar');

  //var sidebar = L.control.sidebar('sidebar').addTo(map);
});