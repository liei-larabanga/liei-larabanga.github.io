var geojsonSources = {
    'baselayer': {
      url: 'data/base_layer.geojson'
    }
  }
;

var geojsonStyles = [
  {
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
  },
  {
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
  }
];