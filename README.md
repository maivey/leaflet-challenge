# Visualizing Data with Leaflet


## Background
![1-Logo](Images/1-Logo.png)

This script is for the following scenario:
Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.

## Prerequisites
Include the following in the index.html:
- Leaflet CSS : ` <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin=""/>`

- CSS : `<link rel="stylesheet" type="text/css" href="static/css/style.css"> `

- D3 Javascript :

  `<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.2.3/d3.min.js"></script>`
  
  `<script src="https://d3js.org/d3.v5.min.js"></script>`
  
 - API Key (must obtain API key [here](https://www.mapbox.com/?utm_medium=sem&utm_source=google&utm_campaign=sem|google|brand|chko-googlesearch-pr01-mapboxbrand-br.broad-us-landingpage-search&utm_term=brand&utm_content=chko-googlesearch-pr01-mapboxbrand-br.broad-us-landingpage-search&gclid=CjwKCAiAvonyBRB7EiwAadauqUCq0i1bqXUitituhm6Bk_6iYz3UDbZ0bEpKt30_ZuFm69nFz6gwGRoCfnYQAvD_BwE) ) : ` <script type="text/javascript" src="static/js/config.js"></script>`
 
 - Javascript : `<script type="text/javascript" src="static/js/logic.js"></script>`

## Level 1 - Basic Visualization

### Get the data set
The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and pick a data set to visualize. When you click on a data set, for example 'All Earthquakes from the Past 7 Days', you will be given a JSON representation of that data. You will be using the URL of this JSON to pull in the data for our visualization. This script uses [All Earthquakes from the Past 7 Days](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson) 

### Import & Visualize the Data
Creates a map using Leaflet that plots all of the earthquakes from the data set based on their longitude and latitude.

   * The data markers should reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.

   * Includes popups that provides additional information about the earthquake when a marker is clicked.

   * Creates a legend that will provide context for your map data.

## Level 2 - More Data
The USGS wants you to plot a second data set on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in a second data set and visualize it along side your original set of data. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.

### Steps:

* Plot a second data set on the map.

* Add a number of base maps to choose from as well as separate out the two different data sets into overlays that can be turned on and off independently.

* Add layer controls to the map.







