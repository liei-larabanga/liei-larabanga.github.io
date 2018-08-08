/**
  'amenities_general'
  'base_layer'
  'civic'
  'construction'
  'described_objects'
  'education'
  'food_and_lodging'
  'larabanga'
  'localities'
  'major_roads'
  'medical'
  'named_objects'
  'noted_objects'
  'paths'
  'public_transport'
  'religious'
  'shops'
  'tourism'
  */
 
 var layerStyles = [
  {
    "id": "major_roads", //layer name in map
    "type": "line",
    "source": 'major_roads', //related to geojsonLayers id
    //"filter": ["==", "$type", "Point"],
    "layout": {
      "line-cap": "round",
      "line-join": "round",
    },
    "paint": {
      "line-color": "#f2f2f2",
      "line-opacity": 1,
      "line-width": {
        "base": 1.2,
        "stops": [
          [
            13.5,
            0
          ],
          [
            14,
            2.5
          ],
          [
            20,
            18
          ]
        ]
      }
    }
  },
  {
    "id": "paths", //layer name in map
    "type": "line",
    "source": 'paths', //related to geojsonLayers id
    "minzoom": 14,
    //"filter": ["==", "$type", "Point"],
    "layout": {
      "line-join": "round"
    },
    "paint": {
      "line-color": "rgba(204, 196, 176, 0.75)",
      /*"line-dasharray": [
        1,
        1
      ],*/
      "line-width": {
        "base": 1.2,
        "stops": [
          [
            14,
            1
          ],
          [
            20,
            6
          ]
        ]
      }
    }
  },
  {
    "id": "tourism", //layer name in map
    "type": "symbol",
    "source": 'tourism', //related to geojsonLayers id
    //"filter": ["==", "$type", "Point"],
    "layout": {
        "icon-image": "other_pink", //related to iconIndex id
        "icon-size": 1
    }
  },
  {
    "id": "civic", //layer name in map
    "type": "symbol",
    "source": 'civic', //related to geojsonLayers id
    //"filter": ["==", "$type", "Point"],
    "layout": {
        "icon-image": "other_yellow", //related to iconIndex id
        "icon-size": 1
    }
  },
  {
    "id": "education", //layer name in map
    "type": "symbol",
    "source": 'education', //related to geojsonLayers id
    //"filter": ["==", "$type", "Point"],
    "layout": {
        "icon-image": "other_cyan", //related to iconIndex id
        "icon-size": 1
    }
  },
  {
    "id": "food_and_lodging", //layer name in map
    "type": "symbol",
    "source": 'food_and_lodging', //related to geojsonLayers id
    //"filter": ["==", "$type", "Point"],
    "layout": {
        "icon-image": "other_blue", //related to iconIndex id
        "icon-size": 1
    }
  },
  {
    "id": "medical", //layer name in map
    "type": "symbol",
    "source": 'medical', //related to geojsonLayers id
    //"filter": ["==", "$type", "Point"],
    "layout": {
        "icon-image": "other_red", //related to iconIndex id
        "icon-size": 1
    }
  },
  {
    "id": "amenities_general", //layer name in map
    "type": "symbol",
    "source": 'amenities_general', //related to geojsonLayers id
    //"filter": ["==", "$type", "Point"],
    "layout": {
        "icon-image": "other_green", //related to iconIndex id
        "icon-size": 1
    }
  },
  {
    "id": "public_transport", //layer name in map
    "type": "symbol",
    "source": 'public_transport', //related to geojsonLayers id
    //"filter": ["==", "$type", "Point"],
    "layout": {
        "icon-image": "other_darkgrey", //related to iconIndex id
        "icon-size": 1
    }
  },
  {
    "id": "shops", //layer name in map
    "type": "symbol",
    "source": 'shops', //related to geojsonLayers id
    //"filter": ["==", "$type", "Point"],
    "layout": {
        "icon-image": "other_orange", //related to iconIndex id
        "icon-size": 1
    }
  },
  {
    "id": "religious", //layer name in map
    "type": "symbol",
    "source": 'religious', //related to geojsonLayers id
    //"filter": ["==", "$type", "Point"],
    "layout": {
        "icon-image": "other_lightgrey", //related to iconIndex id
        "icon-size": 1,
        "visibility": "none"
    }
  },
  /*{
    "id": "base_layer", //layer name in map
    "type": "symbol",
    "source": 'base_layer', //related to geojsonLayers id
    //"filter": ["==", "$type", "Point"],
    "layout": {
        "icon-image": "other", //related to iconIndex id
        "icon-size": 1,
        "visibility": "none"
    }
  },*/
  /*{
    "id": "construction", //layer name in map
    "type": "symbol",
    "source": 'construction', //related to geojsonLayers id
    //"filter": ["==", "$type", "Point"],
    "layout": {
        "icon-image": "other", //related to iconIndex id
        "icon-size": 1
    }
  },*/
  {
    "id": "described_objects", //layer name in map
    "type": "symbol",
    "source": 'described_objects', //related to geojsonLayers id
    //"filter": ["==", "$type", "Point"],
    "layout": {
        "icon-image": "other", //related to iconIndex id
        "icon-size": 1,
        "visibility": "none"
    }
  },
  {
    "id": "localities", //layer name in map
    "type": "symbol",
    "source": 'localities', //related to geojsonLayers id
    //"filter": ["==", "$type", "Point"],
    "layout": {
        "icon-image": "other", //related to iconIndex id
        "icon-size": 1,
        "visibility": "none"
    }
  },
  {
    "id": "named_objects", //layer name in map
    "type": "symbol",
    "source": 'named_objects', //related to geojsonLayers id
    //"filter": ["==", "$type", "Point"],
    "layout": {
        "icon-image": "other", //related to iconIndex id
        "icon-size": 1,
        "visibility": "none"
    }
  },
  {
    "id": "noted_objects", //layer name in map
    "type": "symbol",
    "source": 'noted_objects', //related to geojsonLayers id
    //"filter": ["==", "$type", "Point"],
    "layout": {
        "icon-image": "other", //related to iconIndex id
        "icon-size": 1,
        "visibility": "none"
    }
  }
  /*{
    "id": "larabanga", //layer name in map
    "type": "symbol",
    "source": 'larabanga', //related to geojsonLayers id
    //"filter": ["==", "$type", "Point"],
    "layout": {
        "icon-image": "other", //related to iconIndex id
        "icon-size": 1,
        "visibility": "none"
    }
  }*/
/*{//building base
  'id': 'building',
  'type': 'fill',
  'source': 'baselayer',
  'layout': {
  },
  'filter': [
    "==",
    "building",
    "yes"
  ],
  'paint': {
    "fill-color": {
      "base": 1,
      "stops": [
        [
          15.5,
          "#f2eae2"
        ],
        [
          16,
          "#dfdbd7"
        ]
      ]
    }
  }
},*/
/*{//building top
  'id': 'building_top',
  'type': 'fill',
  'source': 'baselayer',
  'layout': {
  },
  'filter': [
    "==",
    "building",
    "yes"
  ],
  'paint': {
    "fill-color": "#AD8484",
    "fill-opacity": {
      "base": 1,
      "stops": [
        [
          15,
          0
        ],
        [
          16,
          1
        ]
      ]
    },
    "fill-translate": {
      "stops": [
        [
          15,
          [
            0,
            0
          ]
        ],
        [
          16,
          [
            -2,
            -2
          ]
        ]
      ],
      "base": 1
    },
    "fill-outline-color": "#dfdbd7"
  }
},*/
//{
//  
//}

];