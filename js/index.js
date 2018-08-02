//TODO: create own vector tiles & styles... - vector tiles not satisfactory with tippecanoe
//TODO:

var app = new CartONG.Events();
var map;

$(function() {
  map = new mapboxgl.Map(Config.map.settings);

  //custom info control
  map.addControl(new mapboxgl.InfoControl(Config.map.infoPanel));
  map.addControl(new mapboxgl.NavigationControl());
  //custom pitch control
  map.addControl(new mapboxgl.PitchControl());
  map.addControl(new mapboxgl.ScaleControl(), 'bottom-right');

  //map.addControl(new SidebarMapboxgl('sidebar'), 'top-left');
  //var sidebar = new SidebarMapboxgl('sidebar');
  var sidebar = turboSidebar('sidebar');

  var dataContainer = sidebar.getPaneContentContainer('tab-display');
  var dataDisplay = new AppComponents.DataDisplay(dataContainer, map);

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

  map.on('mousemove', function (e) {
    var features = getMouseFeatures(e, {
      layers: Config.map.interactionLayers[map.getStyle().name]
    });
    
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  });
  
  map.on('click', function (e) {
    var features = getMouseFeatures(e, {
      layers: Config.map.interactionLayers[map.getStyle().name]
    });
    if (features.length) {
      var feature = features[0];
      dataDisplay.update(feature, Config.map.dataDisplay[map.getStyle().name]);
      sidebar.open('tab-display');
      
      /*
      var popup = new mapboxgl.Popup({ offset: [0, -15] })
      .setLngLat(feature.geometry.coordinates)
      .setHTML('<h3>' + feature.properties.name + '</h3><p>' + feature.properties.class + '</p>')
      .setLngLat(feature.geometry.coordinates)
      .addTo(map);
      */

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

/*
function getSources() {
  var promise = $.Deferred();
  var source;
  var remaining = 0;
  var sources = {};
  
  //for (var i=0; i < geojsonSources.length; i++) {
    for (var key in geojsonSources) {
      remaining++;
      var source = geojsonSources[key];
      loadJSON(source.url).done(function(k, s) {
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
  */
  
function loadJSON(url) {
  this.promise = $.Deferred();
  var json = {};
  if (url === undefined) {
    promise.resolve(json); // should be reject() but listeners should not have to deal with missing geojson
  } else {
    $.getJSON(url).done(function(json) {
      promise.resolve(json);
    }).fail(function(err) {
      promise.resolve(json); // should be reject() but listeners should not have to deal with missing geojson
    });
  }
  return promise;
}
