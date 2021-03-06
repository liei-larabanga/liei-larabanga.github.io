var Config = Config || {}

Config.map = {
  settings: {
    container: 'map', // id of HTML element containing the map
    //style: 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json', // Style location
    //style: 'http://localhost:8080/mapstyles/osm-bright-gl-custom/osm-bright-larabanga_0.2.json', // Style location
    //style: 'http://localhost:8080/mapstyles/mapbox-streets-custom/old/mapbox-streets-custom_0.4.json', // Style location
    //style: 'http://localhost:8080/mapstyles/mapbox-streets-custom/mapbox-streets-custom.json', // Style location
    style: 'mapstyles/mapbox-streets-custom/mapbox-streets-custom.json', // Style location
    //style: 'mapbox://styles/mapbox/streets-v9', // token required
    center: [-1.860, 9.218], // initial map center
    zoom: 15, // initial zoom level
    bearing: 0, // Initial rotation angle
    pitch: 0,
    hash: true // Allows storing maps position at the URL
  },
  infoPanel: {
    contents: [
      ['h1', 'Liei-Larabanga.org', 'map-title'],
      ['h5', '<a href="https://www.liei-ghana.org/" target="_blank">liei-ghana.org</a>', 'map-subtitle']
    ]
  },
  interactionLayers: {
    'Custom Mapbox Streets': ['poi_z14','poi_z15','poi_z16','poi_transit']
    //'tourism': ['poi_z14','poi_z15','poi_z16','poi_transit']
  },
  dataDisplay: {
    'Custom Mapbox Streets': {
      title: 'name',
      subtitle: 'class',
      hide: ['rank']
    }
  }
}