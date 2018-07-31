//TODO: define sidebar structure
//TODO: create event manager
//TODO: build get data from vector tile features
//TODO: create own vector tiles & styles... uff
//TODO:

var app = new CartONG.Events();
var map;

$(function() {
  map = new mapboxgl.Map({
    container: 'map', // id of HTML element containing the map
    //style: 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json', // Style location
    //style: 'http://localhost:8080/mapstyles/osm-bright-gl-custom/osm-bright-larabanga_0.2.json', // Style location
    style: 'http://localhost:8080/mapstyles/mapbox-streets-custom/mapbox-streets-custom_0.1.json', // Style location
    //style: 'mapbox://styles/mapbox/streets-v9', // token required
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

  /*
  getSources().done(function(sources) {  
    for (var key in sources) {
      map.addSource(key, {
        type: 'geojson',
        data: sources[key].geojson,
      });
    }
    
    for (var i=0; i < geojsonStyles.length; i++) {
      map.addLayer(geojsonStyles[i]);
    }
  });
  */

  //map.on('mousemove', function (e) {
  //  var features = map.queryRenderedFeatures(e.point);
  //  
  //});

});

function getSources() {
  var promise = $.Deferred();
  var source;
  var remaining = 0;
  var sources = {};

  //for (var i=0; i < geojsonSources.length; i++) {
  for (var key in geojsonSources) {
    remaining ++;
    var source = geojsonSources[key];
    loadGeojsonSource(source.url).done(function(k, s) {
      return function(geojson) {
        remaining--;
        s.geojson = geojson;
        sources[k] = s;
        if (!remaining) {
          promise.resolve(sources);
        }
      };
    }(key, source));

  }

  return promise;
}

function loadGeojsonSource(url) {
  this.promise = $.Deferred();
  var geojson = {};
  if (url === undefined) {
    promise.resolve(geojson); // should be reject() but listeners should not have to deal with missing geojson
  } else {
    $.getJSON(url).done(function(geojson) {
      promise.resolve(geojson);
    }).fail(function(err) {
      promise.resolve(geojson); // should be reject() but listeners should not have to deal with missing geojson
    });
  }
  return promise;
}