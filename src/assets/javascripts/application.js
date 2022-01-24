import { initialize_horizontal_tabs } from '/src/assets/javascripts/horizontal_tabs.js';

document.addEventListener("DOMContentLoaded", function() {
  var geoJson = {
    "type": "FeatureCollection",
    "properties": {
      "trip_title": "Going places",
      "trip_description": "These are places we went",
    },
    "features": [],
  };

  var map = L.map('map', {
    center: [41.77, -72.69], // EDIT coordinates to re-center map
    zoom: 6,  // EDIT from 1 (zoomed out) to 18 (zoomed in)
    scrollWheelZoom: true,
    tap: false
  });

  // add Leaflet-Geoman controls with some options to the map
  map.pm.addControls({
    position: 'topleft',
    drawCircle: false,
  });

  /* display basemap tiles -- see others at https://leaflet-extras.github.io/leaflet-providers/preview/ */
  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://osm.org/copyright">\
        OpenStreetMap</a> contributors, &copy;\
        <a href="https://carto.com/attribution">CARTO</a>'
  }).addTo(map);

  L.geoJSON(geoJson).addTo(map);

  var load_geojson_from_geoman = document.getElementById('js-trigger-load-geojson');
  var geojson_container = document.getElementById('js-target-geojson-container');

  function writeGeomanGeojson() {
    var layer_geojson = map.pm.getGeomanLayers(true).toGeoJSON();
    var layer_properties = {
      'properties': {
        'title': document.getElementById('js-new-title').value,
        'description': document.getElementById('js-new-description').value,
        'from-date': document.getElementById('js-new-from-date').value,
        'to-date': document.getElementById('js-new-to-date').value,
      },
    };
    var combined_json = {
      ...layer_geojson,
      ...layer_properties,
    };

    geojson_container.innerHTML = JSON.stringify(combined_json, null, 2);
  }

  load_geojson_from_geoman.addEventListener('click', writeGeomanGeojson);

  initialize_horizontal_tabs();
});
