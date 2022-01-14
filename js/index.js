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
  var mapOptionsContainer = sidebar.getPaneContentContainer('tab-map');
  var mapOptionsUI = new AppComponents.MapOptions(mapOptionsContainer, map);
  
  sidebar.open('tab-map');
  
  map.on('load', function() {
    /*
    // create a DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.innerHTML = '<img src="'+iconIndex.other_pink.src+'" alt="X">';
    //el.style.backgroundImage = iconIndex.other_pink.src;
    el.style.width = '50px';
    el.style.height = '50px';

    var marker = new mapboxgl.Marker({
      //color: "#FFFFFF",
      //draggable: true
      element: el
    })
    .setLngLat([-2, 9])
    .addTo(map);
    */

    //var icons;
    loadIcons(map).done(function(iconCache) {
      //icons = iconCache;
      getJSONSources(geojsonLayers, 'src').done(function(sources) {
        
        for (var key in sources) {
          sources[key].addTo(map);
        }
        
        //this is to add layers below labels
        // Find the index of the first symbol layer in the map style
        //var firstSymbolId;
        //for (var i = 0; i < layers.length; i++) {
          //    if (layers[i].type === 'symbol') {
            //        firstSymbolId = layers[i].id;
            //        break;
            //    }
            //}


        //TODO: stop relying on this array and start using visibility property!
        map.geojsonLayers = [];
        for (var i=0; i < layerStyles.length; i++) {
          //TODO: control source ok

          map.addLayer(layerStyles[i]);
          //map.addLayer(layerStyles[i], firstSymbolId);
          var isVisible = (layerStyles[i].layout && layerStyles[i].layout.visibility && layerStyles[i].layout.visibility == 'none') ? false : true;
          if (isVisible) {
            map.geojsonLayers.push(layerStyles[i].id);
          }
        }
        
        mapOptionsUI.update(layerStyles);
        
        map.on('mousemove', function (e) {
          var features = getMouseFeatures(e, {
            //layers: Config.map.interactionLayers[map.getStyle().name]
            layers: Config.map.interactionLayers[map.getStyle().name].concat(map.geojsonLayers)
          });
          
          map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
        });
        
        map.on('click', function (e) {
          var features = getMouseFeatures(e, {
            layers: Config.map.interactionLayers[map.getStyle().name].concat(map.geojsonLayers) //a.concat(b)
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
          
        });
        
      });
          
    });

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


function getJSONSources(config, srcKey) {
  var promise = $.Deferred();
  var source;
  var remaining = 0;
  var sources = {};
  
  for (var key in config) {
    remaining++;
    sources[key] = new AppComponents.JSONSource(key, config[key][srcKey]);
    sources[key].load().done(function() {
      remaining--;
      if (!remaining) {
        promise.resolve(sources);
      }
    });
  }
  
  return promise;
}
  
function loadJSON(url) {
  var promise = $.Deferred();
  //var json = {};
  if (url === undefined) {
    promise.resolve({}); // should be reject() but listeners should not have to deal with missing geojson
  } else {
    $.getJSON(url)
      .done(function(json) {
        promise.resolve(json);
      })
      .fail(function(err) {
        promise.resolve({}); // should be reject() but listeners should not have to deal with missing geojson
      });
  }
  return promise;
}
