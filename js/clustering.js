'use strict';

ajaxRequest("POST", 'php/request.php/predCluster', PutCluster);

function SetColor(x){
  var color_dict = {
    1:"#2E282A",
    2:"#76B041",
    3:"#FFC914",
    4:"#17BEBB",
    5:"#E4572E",
    6:"#B90E0A",
    7:"#663399",
    8:"#E4B363",
    9:"#3F826D",
    10:"#407899",
    11:"#F699CD",
    12:"#ABDF75"
  }
  return color_dict[x]
}

function PutCluster(data) {
    data = JSON.parse(data[2]);

    var latitude = [];
    var longitude = [];
    var cluster_id = [];
    var centroids_id = [];
    var centroids_lat= [];
    var centroids_lon = [];
    
    Object.entries(data["point"]).forEach(element => {
      latitude.push(element[1]['latitude']);
      longitude.push(element[1]['longitude']);
      cluster_id.push(element[1]['cluster']);
    });

    Object.entries(data["clusters"]).forEach(element => {
      centroids_lat.push(element[1][1]);
      centroids_lon.push(element[1][0]);
      centroids_id.push(element[0]);
    });
  
    var trace_points = {
      type: 'scattermapbox',
      lat: latitude,
      lon: longitude,
      mode: 'markers',
      marker: {
        size: 10,
        color: cluster_id.map(x => SetColor(x)),
        opacity: 0.8
      },
      text: "Point"
    };

    var trace_clusters = {
      type: 'scattermapbox',
      lat: centroids_lat,
      lon: centroids_lon,
      mode: 'markers',
      marker: {
        size: 8,
        color: centroids_id.map(x => SetColor(x)),
        opacity: 0.4
      },
      text: centroids_id.map(function(value,index){
        return "Cluster n°" + value;
      })
    };
  
    var layout = {
      title: 'Avec les Centroïdes des Anciens accidents',
      mapbox: {
        style: 'open-street-map',
        center: {
          lat: 46.227638,
          lon: 2.213749
        },
        zoom: 4
      },  
      geo: {
        projection: {
          type: 'orthographic'
        }
      },
    };

    
    var data = [trace_points, trace_clusters];
  
    Plotly.newPlot('map', data, layout);
}