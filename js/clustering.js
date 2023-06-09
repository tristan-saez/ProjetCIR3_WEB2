'use strict';


ajaxRequest("POST", 'php/request.php/predCluster', PutCluster);

//permet d'appliquer la couleur correspondant au cluster
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

//affiche les clusters sur une carte et tous les points qui y sont associés
function PutCluster(data) {
    //récupère les données voulus depuis le JSON
    data = JSON.parse(data[2]);

    var latitude = [];
    var longitude = [];
    var cluster_id = [];
    var centroids_id = [];
    var centroids_lat= [];
    var centroids_lon = [];
    
    //ajoute la latitude, longitude et le cluster associé au point dans des tableaux distincts
    Object.entries(data["point"]).forEach(element => {
      latitude.push(element[1]['latitude']);
      longitude.push(element[1]['longitude']);
      cluster_id.push(element[1]['cluster']);
    });

    //ajoute la latitude, longitude et d'un cluster et son id associée dans des tableaux distincts
    Object.entries(data["clusters"]).forEach(element => {
      centroids_lat.push(element[1][1]);
      centroids_lon.push(element[1][0]);
      centroids_id.push(element[0]);
    });
    
    //défini les points à afficher 
    var trace_points = {
      type: 'scattermapbox',
      name: 'Nouveaux Accidents',
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

    //défini les points à afficher 
    var trace_clusters = {
      type: 'scattermapbox',
      name: 'Centroïdes',
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
    
    //détermine le layout de la carte
    var layout = {
      title: 'Avec les Centroïdes des Anciens accidents',
      mapbox: {
        style: 'open-street-map',
        center: {
          lat: 46.567527,
          lon: 2.545228
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
    
    //affiche la carte, points et clusters
    Plotly.newPlot('map', data, layout);
}