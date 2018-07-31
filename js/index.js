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
    
    // Find the index of the first symbol layer in the map style
    //var firstSymbolId;
    //for (var i = 0; i < layers.length; i++) {
    //    if (layers[i].type === 'symbol') {
    //        firstSymbolId = layers[i].id;
    //        break;
    //    }
    //}

    for (var i=0; i < geojsonStyles.length; i++) {
      map.addLayer(geojsonStyles[i]);
      //map.addLayer(geojsonStyles[i], firstSymbolId);
    }
  });
  */

  var interactionLayers = ['poi_z14','poi_z15','poi_z16','poi_transit']
  map.on('mousemove', function (e) {
    var features = getMouseFeatures(e, {
      layers: interactionLayers
    });
    
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  });
  
  map.on('click', function (e) {
    var features = getMouseFeatures(e, {
      layers: interactionLayers
    });
    if (features.length) {
      var feature = features[0];
      var popup = new mapboxgl.Popup({ offset: [0, -15] })
      .setLngLat(feature.geometry.coordinates)
      .setHTML('<h3>' + feature.properties.name + '</h3><p>' + feature.properties.class + '</p>')
      .setLngLat(feature.geometry.coordinates)
      .addTo(map);
    }

  })
  

});

function getMouseFeatures(e, opts) {
  opts = opts || {};
  var features;
  var queryBox;
  var queryParameters;
  var defaults = {
    threshold: 5
  }
  for (var key in defaults) {
    opts[key] = opts[key] || defaults[key];
  }
  queryBox = [
    [
      e.point.x - opts.threshold,
      e.point.y + opts.threshold
    ], // bottom left (SW)
    [
      e.point.x + opts.threshold,
      e.point.y - opts.threshold
    ] // top right (NE)
  ];
  queryParameters = {};
  if (opts.layers) {
    queryParameters.layers = opts.layers;
  }
  features = map.queryRenderedFeatures(queryBox, queryParameters) || [];
  return features;
}


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