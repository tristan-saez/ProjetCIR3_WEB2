"use strict";

//recupère la liste des accidents contenus dans la base de données
ajaxRequest('POST', 'php/request.php/ancien_acc', ancien_acc);
ajaxRequest('POST', 'php/request.php/ancien_acc', ancien_acc_scatter);

ajaxRequest('POST', 'php/request.php/accident', accident_scatter);
ajaxRequest('POST', 'php/request.php/accident', accident);


//Le code qui initialisent la page carte afin de pas afficher une page blanche

function ancien_acc(data) {
  //permet d'afficher le tableau en fonction des paramètres récupérés pour les anciens accidents

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
  //permet d'afficher le tableau en fonction des paramètres récupérés pour les nouveaux accidents

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
      "<td>" + "<button class='button' onclick='get_pred("+ element['id_acc'] +")'>Gravité</button>" +"</td>" +
      "</tr>";
    });
}


var elementVisible_old = true;
function old_acc() {
  //affiche/retire la carte à l'appui du bouton

  var elements = document.getElementsByClassName("ancien_acc");

  //affiche/retire les élements lié du tableau
  for (var i = 0; i < elements.length; i++) {
    if (elementVisible_old) {
      elements[i].style.display = "none";
    } else {
      elements[i].style.display = "table-row";
    }
  }

  //affiche/retire la carte lié 
  var map = document.getElementById("map");
  if(elementVisible_old){
    map.style.display="none";
    elementVisible_old=false;

    //change la couleur du bouton lors de la suppression de la carte
    document.getElementById("old_acc_f").style.backgroundColor = "white";
    document.getElementById("old_acc_f").style.color = "#426B1F";  
  }else{
    map.style.display="block";
    elementVisible_old=true;

    //change la couleur du bouton lors de l'afffichage de la carte
    document.getElementById("old_acc_f").style.backgroundColor = "#426B1F";
    document.getElementById("old_acc_f").style.color = "white";  
  }
  
}

var elementVisible_new = true;
var new_map = true;

function new_acc(){
  //même chose que la fonction précédente mais pour les nouveaux accidents
  
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
    document.getElementById("new_acc_f").style.backgroundColor = "white";
    document.getElementById("new_acc_f").style.color = "#426B1F";       
  }else{
    map.style.display="block";
    elementVisible_new=true;
    document.getElementById("new_acc_f").style.backgroundColor = "#426B1F";
    document.getElementById("new_acc_f").style.color = "white";  
  }

}

function  ancien_acc_scatter(data){
  //gère l'affichage de la carte des anciens accidents et des points via plotly

  var latitude = [];
  var longitude = [];
  var lum = [];
  var ville = [];
  var athmo = [];
  var secu = [];
  var surface = [];
  var date=[];

  //ajoute les entrés associées au point dans des tableaux distincts
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
        lat: 46.567527,
        lon: 2.545228
      },
      zoom: 4
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
  //gère l'affichage de la carte des nouveaux accidents et des points via plotly

  console.log(data);
  var latitude = [];
  var longitude = [];
  var lum = [];
  var ville = [];
  var athmo = [];
  var secu = [];
  var surface = [];
  var date=[];

   //ajoute les entrés associées au point dans des tableaux distincts
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
        lat: 46.567527,
        lon: 2.545228
      },
      zoom: 4
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
