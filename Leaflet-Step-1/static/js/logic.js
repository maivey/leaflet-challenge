url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Create the map centered on the US, zoomed 4.9
var myMap = L.map("map", {
    center: [40.52, -105.67],
    zoom: 4.9
  });
  
// Add a tile layer (the background map image) to our map
// Use the addTo method to add objects to our map
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 10,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);

// Create getColor() function to get the color depending on the Earthquake's magnitude
function getColor(x) {
    return  x > 5 ? "#f40202" :
    x > 4 ? "#f45f02" :
    x > 3 ? "#f49702" :
    x > 2 ? "#F4bc02" :
    x > 1 ? "#d8f402" :
    x > 0 ? "#93f402" :
         "#FFEDA0"
    };

      
d3.json(url).then(response =>  {

  // Create a GeoJSON layer with the retrieved data
  function geojsonMarkerOptions(feature) {

      var markerOption = {
          radius: +feature.properties.mag*4,
        fillColor: getColor(feature.properties.mag),
        color: "darkgrey",
        weight: 1,
        stroke: true,
        opacity: 1,
        fillOpacity: 0.8
      }
      return markerOption;
    };

// Add the earthquakes to the map
    var geojson = L.geoJSON(response, {
        
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions(feature));
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.place + "</h3>"+ "<hr><h4>Magnitude: "
                        + +feature.properties.mag + "</h4>");
          }
      
    }).addTo(myMap);

// Create legend of Earthquake magnitudes for the map
      var legend = L.control({position: 'bottomright'});

      legend.onAdd = function(map) {

      var div = L.DomUtil.create('div','info legend'),
          magnitudes = [0,1,2,3,4,5],
          labels = [];

          for (var i=0; i < magnitudes.length; i++){

              if (i===5) {
                  labels.push("<tr><td style = 'background-color:" + getColor(magnitudes[i]) + "'>" + magnitudes[i] + '+' + "</td></tr>");

              } else {
                  labels.push("<tr><td style = 'text-align: center; background-color:" + getColor(magnitudes[i]) + "'>" + magnitudes[i] + '-' + magnitudes[i+1] + "</td></tr>");
              }
          }
              div.innerHTML += "<div style = 'text-align: center; background-color: white'><table><th style='margin:4px'>Magnitude</th>" + labels.join("") + "</table></div>"

            return div;
          
        
      };
      // Add the legend to myMap
        legend.addTo(myMap);

});// Ends d3.json()
