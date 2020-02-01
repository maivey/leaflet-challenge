url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
platesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"

//Call createPOI() function to create the points of interest (Earthquakes, Fault Lines)
d3.json(url).then(response => {
    createPOI(response)
})


function createMap(earthquakes, faultLines) {

 // Creating the tile layers (the background map image) to our map

 // Create satellite tile layer
  var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 10,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

  // Create outdoor tile layer
  var outdoors = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 10,
    id: "mapbox.outdoors",
    accessToken: API_KEY
  });

  // Create grayscale tile layer
  var grayscale = L.tileLayer.grayscale("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 10,
    id: "mapbox.dark",
    accessToken: API_KEY
  });
  // Create baseMaps to hold the tile layers
    var baseMaps = {
        "Satellite" : satellite,
        "Outdoors" : outdoors,
        "Grayscale": grayscale
    };
    
    // Create overlayMaps to hold overlay maps (Earthquakes and Fault Lines)
    var overlayMaps = {
        "Earthquakes": earthquakes,
        "Fault Lines" : faultLines,
    };

    // Create myMap with tile layers
    var myMap = L.map("map", {
        center: [40.52, -100.67],
        zoom: 4.5,
        layers : [satellite, outdoors, grayscale]
    });

    // Add tile layers, overlay maps to map; collapse on opening page
    L.control.layers(baseMaps, overlayMaps, {collapsed: true}).addTo(myMap);

    // Call createLegend() to create legend
    createLegend(myMap)

    // Return the main map myMap
    return myMap;
}//Ends createmap

// Create getColor function which gets the color based on the magnitude of the Earthquake
function getColor(x) {
return  x > 5 ? "#f40202" :
x > 4 ? "#f45f02" :
x > 3 ? "#f49702" :
x > 2 ? "#F4bc02" :
x > 1 ? "#d8f402" :
x > 0 ? "#93f402" :
        "#FFEDA0"
}; // Ends getColor() function

// Create the points of interest on the map
function createPOI(response) {      
    // Creating a GeoJSON layer with the retrieved data
    function geojsonMarkerOptions(feature) {
        var markerOption = {
            radius: +feature.properties.mag*4,
            fillColor: getColor(feature.properties.mag),
            color: "darkgrey",
            weight: 1,
            stroke: true,
            opacity: 1,
            fillOpacity: 0.8
    };

    return markerOption;
    };// Ends geojsonMarkerOptions
    
    // Create Earthquakes layer
    var earthquakes = L.geoJSON(response, {
        
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions(feature));
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup("<h3>" + feature.properties.place + "</h3>"+ "<hr><h4>Magnitude: "
                            + +feature.properties.mag + "</h4>");
              }
          
        }); // Ends earthquakes L.geoJSON()
    
    // Create faultLines layer
    d3.json(platesURL).then(response => {
        var faultLines = L.geoJSON(response, {
            style : {
                color: 'orange',
                fillColor: 'none',
                opacity: 1,
                stroke: true
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup("<h3>" + "Plate Name : " + feature.properties.PlateName + "</h3>");
            }
        })
        
        // Call createMap() function to add layers to map
        var myMap = createMap(earthquakes,faultLines)
    });

}; //Ends createPOI() function

// Function createLegend to create legend
function createLegend(myMap) {

    // Legend for earthquakes
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function(map) {

    var div = L.DomUtil.create('div','info legend'),
        magnitudes = [0,1,2,3,4,5],
        labels = [];

    // Loop through our magnitudes intervals and generate a label for each interval
    for (var i=0; i < magnitudes.length; i++){

        if (i===5) {
            labels.push("<tr><td style = 'background-color:" + getColor(magnitudes[i]) + "'>" + magnitudes[i] + '+' + "</td></tr>");

        } else {
            labels.push("<tr><td style = 'text-align: center; background-color:" + getColor(magnitudes[i]) + "'>" + magnitudes[i] + '-' + magnitudes[i+1] + "</td></tr>");

        }
    }
        div.innerHTML += "<div style = 'text-align: center; background-color: white; border-radius:5px'><table><th style='margin:4px'>Magnitude</th>" + labels.join("") + "</table></div>"

      return div;
    
  
};// Ends function(map)

    // Legend for fault lines
  var legend2 = L.control({position: 'bottomright'});
    legend2.onAdd = function(map) {

    var div2 = L.DomUtil.create('div','info legend');
    div2.innerHTML +=  "<ul class='legend'><li><span class='superawesome'></span> Fault Lines</li></ul>"
    return div2;
    };

    // Add legend based on which overlay the user selects
  myMap.on('overlayadd', function(eventLayer){
      console.log(eventLayer.name)
    if (eventLayer.name === 'Earthquakes'){
        myMap.addControl(legend);
        legend.addTo(myMap);
    } else if (eventLayer.name === "Fault Lines") {
        myMap.addControl(legend2);
        legend2.addTo(myMap)
    }
});
myMap.on('overlayremove', function(eventLayer){
    if (eventLayer.name === 'Earthquakes'){
         myMap.removeControl(legend);
    } else if (eventLayer.name === "Fault Lines"){
        myMap.removeControl(legend2)
    }
});

};// Ends createLegend() function


  