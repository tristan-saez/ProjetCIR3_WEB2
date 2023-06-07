"use strict";

ajaxRequest('POST', 'php/request.php/ancien_acc', ancien_acc);
ajaxRequest('POST', 'php/request.php/ancien_acc', ancien_acc_scatter);

ajaxRequest('POST', 'php/request.php/accident', accident_scatter);
ajaxRequest('POST', 'php/request.php/accident', accident);




function ancien_acc(data) {

  var siuuu = document.getElementById('SIUUU');
  data.forEach(element => {
    siuuu.innerHTML +=
        "<tr class='ancien_acc'>"+
        "<td> " + element['date'] + "</td>" +
        "<td>" + element['latitude'] + "</td>" +
        "<td>" + element['longitude'] + "</td>" +
        "<td>" + element['an_nais'] + "</td>" +
        "<td>" + element['id_code_insee'] + "</td>" +
        "<td>" + element['descr_lum'] + "</td>" +
        "<td>" + element['descr_athmo'] + "</td>" +
        "<td>" + element['descr_etat_surf'] + "</td>" +
        "<td>" + element['descr_dispo_secu'] + "</td>" +
        "</tr>";

});
}

function accident(data){
  var siuuu = document.getElementById('SIUUU');
    data.forEach(element =>{
      siuuu.innerHTML +=
      "<tr class='nouv_accident'>"+
      "<td>" + element['horodatage'] + "</td>" +
      "<td>" + element['latitude'] + "</td>" +
      "<td>" + element['longitude'] + "</td>" +
      "<td>" + element['an_naiss_conduct'] + "</td>" +
      "<td>" + element['insee'] + "</td>" +
      "<td>" + element['lum'] + "</td>" +
      "<td>" + element['athmo'] + "</td>" +
      "<td>" + element['etat_route'] + "</td>" +
      "<td>" + element['dispo_secu'] + "</td>" +
      "<td>" + "<a class='button' href='prediction.html'>Gravité</a>" +"</td>" +
      "<td>" + "<a class='button' href='clustering.html'>Cluster</a>" +
      "</td>" +
      "</tr>";
    });
}


var elementVisible_old = true;
    function old_acc() {
      
      var elements = document.getElementsByClassName("ancien_acc");
      for (var i = 0; i < elements.length; i++) {
        if (elementVisible_old) {
          elements[i].style.display = "none";
        } else {
          elements[i].style.display = "table-row";
        }
      }
      var map = document.getElementById("map");
      if(elementVisible_old){
        map.style.display="none";
        elementVisible_old=false;        
      }else{
        map.style.display="block";
        elementVisible_old=true;
      }
      
    }

var elementVisible_new = true;
var new_map = true;

    function new_acc(){
      var elements = document.getElementsByClassName("nouv_accident");
      for (var i = 0; i < elements.length; i++) {
        if (elementVisible_new) {
          elements[i].style.display = "none";
        } else {
          elements[i].style.display = "table-row";
        }
      }
      var map = document.getElementById("map2");
      if(elementVisible_new){
        map.style.display="none";
        elementVisible_new=false;        
      }else{
        map.style.display="block";
        elementVisible_new=true;
      }

    }

function  ancien_acc_scatter(data){

  var latitude = [];
  var longitude = [];
  var lum = [];
  var ville = [];
  var athmo = [];
  var secu = [];
  var surface = [];
  var date=[];
  data.forEach(element => {
    latitude.push(element['latitude']);
    longitude.push(element['longitude']);
    lum.push(element['descr_lum']);
    ville.push(element['ville']);
    athmo.push(element['descr_athmo']);
    secu.push(element['descr_dispo_secu']);
    surface.push(element['descr_etat_surf']);
    date.push(element['date']);
  });

  var trace = {
    type: 'scattermapbox',
    lat: latitude,
    lon: longitude,
    mode: 'markers',
    marker: {
      size: 10,
      color: 'rgb(255, 0, 0)',
      opacity: 0.7
    },
    text: date.map(function(value,index){
      return "Date:" + value + "<br>Ville:" + ville[index] + "<br>Lum:" +lum[index] + "<br>athmo:" + athmo[index] + "<br>secu:" + secu[index] + "<br>surface:" +surface[index];
    })
    
  };

  var layout = {
    title: 'Anciens accidents',
    mapbox: {
      style: 'open-street-map',
      center: {
        lat: 48.8584,
        lon: 2.2945
      },
      zoom: 2
    },  
    geo: {
      projection: {
        type: 'orthographic'
      }
    }
  };

  var data = [trace];

  Plotly.newPlot('map', data, layout);
}


function accident_scatter(data){
  console.log(data);
  var latitude = [];
  var longitude = [];
  var lum = [];
  var ville = [];
  var athmo = [];
  var secu = [];
  var surface = [];
  var date=[];
  data.forEach(element => {
    latitude.push(element['latitude']);
    longitude.push(element['longitude']);
    lum.push(element['lum']);
    ville.push(element['ville']);
    athmo.push(element['athmo']);
    secu.push(element['dispo_secu']);
    surface.push(element['etat_route']);
    date.push(element['horodatage']);
  });

  var trace = {
    type: 'scattermapbox',
    lat: latitude,
    lon: longitude,
    mode: 'markers',
    marker: {
      size: 10,
      color: 'rgb(0, 255, 0)',
      opacity: 0.7
    },
    text: date.map(function(value,index){
      return "Date:" + value + "<br>Ville:" + ville[index] + "<br>Lum:" +lum[index] + "<br>athmo:" + athmo[index] + "<br>secu:" + secu[index] + "<br>surface:" +surface[index];
    })
    
  };

  var layout = {
    title: 'Nouveaux accidents',
    mapbox: {
      style: 'open-street-map',
      center: {
        lat: 48.8584,
        lon: 2.2945
      },
      zoom: 2
    },  
    geo: {
      projection: {
        type: 'orthographic'
      }
    }
  };

  var data = [trace];

  Plotly.newPlot('map2', data, layout);

}

