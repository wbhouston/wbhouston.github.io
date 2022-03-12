import { initialize_horizontal_tabs } from '/src/assets/javascripts/horizontal_tabs.js';

var map;
var loaded_feature_group;
var edited_feature_group;

async function fetch_html(url) {
  try {
    let response = await fetch(url);
    return response.text();
  } catch (error) {
    console.log(error);
  }
}

async function fetch_json(url) {
  try {
    let response = await fetch(url);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

async function add_json_to_map(url) {
  var trip_json = await fetch_json(url);
  var trip_items_list = document.getElementById('js-trip-items-target');
  trip_items_list.innerHTML = '';
  var trip_item_html = await fetch_html('/src/components/trip-item.html');

  loaded_feature_group.clearLayers();
  edited_feature_group.clearLayers();
  L.geoJSON(trip_json, {
    onEachFeature: function (feature, layer) {
      var item_html_copy = trip_item_html;
      trip_items_list.innerHTML +=
        item_html_copy.
          replace('TITLE', feature.properties.title).
          replace('DESCRIPTION', feature.properties.description);

      if (feature.properties.description) {
        layer.bindPopup('<p>' + feature.properties.description + '</p>');
      }
    }
  }).addTo(loaded_feature_group);
}

async function load_trip_index() {
  var trip_list = document.getElementById('js-trip-list');
  var trip_html = await fetch_html('/src/components/trip-list-item.html');
  var trip_index = await fetch_json('/public/trips_index.json');

  trip_index['trip_files'].forEach((item) => {
    trip_list.innerHTML +=
      trip_html.
        replace('TITLE', item['title']).
        replace('FILEPATH', item['file']).
        replace('SUBTITLE', item['subtitle']);
  });
}

function delegate(element, event_name, selector, handler) {
  element.addEventListener(event_name, function(event) {
    var t = event.target;
    while (t && t !== this) {
      if (t.matches(selector)) {
        handler.call(t, event);
      }

      t = t.parentNode;
    }
  });
}

function load_trip_to_map(event) {
  var target = this;
  var json_url = target.dataset.tripGeojsonUrl;

  add_json_to_map(json_url);
}

function writeGeomanGeojson() {
  var geojson_container = document.getElementById('js-target-geojson-container');
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

document.addEventListener("DOMContentLoaded", function() {
  map = L.map('map', {
    center: [31.998743, -80.847221],
    zoom: 15,  // EDIT from 1 (zoomed out) to 18 (zoomed in)
    scrollWheelZoom: true,
    tap: false
  });

  loaded_feature_group = L.featureGroup().addTo(map);
  edited_feature_group = L.featureGroup().addTo(map);
  map.pm.setGlobalOptions({
    featureGroup: edited_feature_group,
  });

  map.on('pm:create', function(event) {
    var target = event.marker;
    console.log(target._leaflet_id);
  });

  loaded_feature_group.on('click', function(event) {
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

  var load_geojson_from_geoman = document.getElementById('js-trigger-load-geojson');

  load_geojson_from_geoman.addEventListener('click', writeGeomanGeojson);

  initialize_horizontal_tabs();
  load_trip_index();

  delegate(document, 'click', '.js-load-trip', load_trip_to_map);
});
