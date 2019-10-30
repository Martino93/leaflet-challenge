var queryURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson'

d3.json(queryURL, function(data){
    createFeautures(data);
});

function createFeautures(earthquakeData){
    function onEachFeature(feature, layer){
        layer.bindPopup("<h3>" + feature.properties.place + '</h3<hr><p>' + new Date(feature.properties.time) + '</p>' + 'magnitude: ' + feature.properties.mag);
    }

    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });
    createMap(earthquakes);
}

function createMap(earthquakes) {
    // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
    });

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
    };

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
    Earthquakes: earthquakes
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
    center: [
    37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
    }).addTo(myMap);

    // d3.json(queryURL, function(response) {

    //     console.log(response);
      
    //     var heatArray = [];
      
    //     for (var i = 0; i < response.length; i++) {
    //       var location = response[i].location;
      
    //       if (location) {
    //         heatArray.push([location.coordinates[1], location.coordinates[0]]);
    //       }
    //     }
      
    //     var heat = L.heatLayer(heatArray, {
    //       radius: 20,
    //       blur: 35
    //     }).addTo(myMap);
    //}
    //)
};
