var geojsonLayers = {
    'tourism': {
      src: 'data/tourism.geojson'
    },
    'civic': {
      src: 'data/civic.geojson'
    },
    'education': {
      src: 'data/education.geojson'
    },
    'food_and_lodging': {
      src: 'data/food_and_lodging.geojson'
    },
    'medical': {
      src: 'data/medical.geojson'
    }
  };
  
  var geojsonSources = {
    'baselayer': {
      url: 'data/base_layer.geojson'
    }
  };
  
  var layerStyles = [
    {
      "id": "tourism", //layer name in map
      "type": "symbol",
      "source": 'tourism', //related to geojsonLayers id
      //"filter": ["==", "$type", "Point"],
      "layout": {
          "icon-image": "other_pink", //related to iconIndex id
          "icon-size": 0.1
      }
    },
    {
      "id": "civic", //layer name in map
      "type": "symbol",
      "source": 'civic', //related to geojsonLayers id
      //"filter": ["==", "$type", "Point"],
      "layout": {
          "icon-image": "other_yellow", //related to iconIndex id
          "icon-size": 0.1
      }
    },
    {
      "id": "education", //layer name in map
      "type": "symbol",
      "source": 'education', //related to geojsonLayers id
      //"filter": ["==", "$type", "Point"],
      "layout": {
          "icon-image": "other_cyan", //related to iconIndex id
          "icon-size": 0.1
      }
    },
    {
      "id": "food_and_lodging", //layer name in map
      "type": "symbol",
      "source": 'food_and_lodging', //related to geojsonLayers id
      //"filter": ["==", "$type", "Point"],
      "layout": {
          "icon-image": "other_blue", //related to iconIndex id
          "icon-size": 0.1
      }
    },
    {
      "id": "medical", //layer name in map
      "type": "symbol",
      "source": 'medical', //related to geojsonLayers id
      //"filter": ["==", "$type", "Point"],
      "layout": {
          "icon-image": "other_red", //related to iconIndex id
          "icon-size": 0.1
      }
    }
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