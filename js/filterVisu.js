var filterToggle = document.getElementById("filter-toggle");
var filterMenu = document.getElementById("filter-menu");
var applyFilterBtn = document.getElementById("apply-filter");
var selectedFiltersElem = document.getElementById("selected-filters");
var cleanFilterBtn = document.getElementById("clean-filter-btn");

//Detecteur d'evenement, ici un click. On reaffiche ou fait disparaitre selon le display.
filterToggle.addEventListener("click", function () {
  if (filterMenu.style.display === "block") {
    filterMenu.style.display = "none";
  } else {
    filterMenu.style.display = "block";
  }
});

// filters est un objet qui stocke les filtres actifs dans chaque catégorie. 
var filters = {
  type: [],
  ville: [],
  age: [],
  lumi: [],
  secu: [],
  surf: []
};
// SelectedFilters est un objet similaire à filters qui stocke les filtres sélectionnés par l'utilisateur. 
//Lorsque l'utilisateur ajoute un nouveau filtre, celui-ci est ajouté à la fois à filters et selectedFilters.
var selectedFilters = {
  type: [],
  ville: [],
  age: [],
  lumi: [],
  secu: [],
  surf: []
};
// ExistingFilters est également un objet similaire à filters, mais il stocke tous les filtres qui ont été appliqués à la liste de données, 
//y compris ceux qui ont été supprimés. Il sert à garder une trace de tous les filtres qui ont été utilisés.
var existingFilters = {
  type: [],
  ville: [],
  age: [],
  lumi: [],
  secu: [],
  surf: []
};

//Detecteur d'evenement du button applyFilterBtn comme id. L'évènement est le click.
applyFilterBtn.addEventListener("click", function () {
  //init
  var typeFilter = document.getElementById("athmo").value;
  var villeFilter = document.getElementById("ville").value;
  var ageFilter = document.getElementById("age").value;
  var lumiFilter = document.getElementById("lumi").value;
  var secuFilter = document.getElementById("secu").value;
  var surfFilter = document.getElementById("surf").value;

  // Ajouter les nouveaux filtres s'ils ne sont pas déjà présents
  if (typeFilter !== "all" && !existingFilters.type.includes(typeFilter)) {
    filters.type.push(typeFilter);
    selectedFilters.type.push(typeFilter);
    existingFilters.type.push(typeFilter);
  }
    // Ajouter les nouveaux filtres s'ils ne sont pas déjà présents

  if (villeFilter !== "all" && villeFilter !== "" && !existingFilters.ville.includes(villeFilter)) {
    // Cette instruction utilise une expression régulière pour extraire le code INSEE de la valeur du filtre villeFiler
    var codeInsee = villeFilter.match(/([0-9]+)/)[0];
    filters.ville.push(codeInsee);
    selectedFilters.ville.push(villeFilter);
    existingFilters.ville.push(villeFilter);
  }

  if (ageFilter !== "all" && !existingFilters.age.includes(ageFilter)) {
    filters.age.push(ageFilter);
    selectedFilters.age.push(ageFilter);
    existingFilters.age.push(ageFilter);
  }

  if (lumiFilter !== "all" && !existingFilters.lumi.includes(lumiFilter)) {
    filters.lumi.push(lumiFilter);
    selectedFilters.lumi.push(lumiFilter);
    existingFilters.lumi.push(lumiFilter);
  }

  if (surfFilter !== "all" && !existingFilters.surf.includes(surfFilter)) {
    filters.surf.push(surfFilter);
    selectedFilters.surf.push(surfFilter);
    existingFilters.surf.push(surfFilter);
  }

  if (secuFilter !== "all" && !existingFilters.secu.includes(secuFilter)) {
    filters.secu.push(secuFilter);
    selectedFilters.secu.push(secuFilter);
    existingFilters.secu.push(secuFilter);
  }

  var selectedFiltersHTML = "";
  //Le button remove ne marche pas
  for (var category in selectedFilters) {
    for (var i = 0; i < selectedFilters[category].length; i++) {
      selectedFiltersHTML += '<div class="selected-filter">' + selectedFilters[category][i] + '<span class="remove-filter" onclick="removeFilter(this, \'' + category + '\', \'' + selectedFilters[category][i] + '\')">x</span></div>';
    }
  }
//  Chaque filtre sélectionné est encapsulé dans une balise <div> avec une classe spécifique pour le style, 
//et un bouton de suppression représenté par une balise <span> est ajouté pour permettre la suppression du filtre. 
  selectedFiltersElem.innerHTML = selectedFiltersHTML;


  $.ajax({
    //url à qui l'envoyer, la methode et la data
    url: 'php/filtre.php',
    method: 'POST',
    data: { filters: filters },

    //Condition si succès

    success: function (response) {
      var parsedResponse = JSON.parse(response);

      //On trie les anciens accidents
      var siuuu = document.getElementById('SIUUU');
      // On nettoie le tableau
      siuuu.innerHTML="";
      // On ajoute nb element(s) au tableau
      parsedResponse.ancien_accident.forEach(element => {
        siuuu.innerHTML +=
          "<tr class='ancien_acc'>" +
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
      //Plotly anciens accidents
      var latitude = [];
      var longitude = [];
      var lum = [];
      var ville = [];
      var athmo = [];
      var secu = [];
      var surface = [];
      var date = [];

      parsedResponse.ancien_accident.forEach(element => {
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
        text: date.map(function (value, index) {
          return "Date:" + value + "<br>Ville:" + ville[index] + "<br>Lum:" + lum[index] + "<br>athmo:" + athmo[index] + "<br>secu:" + secu[index] + "<br>surface:" + surface[index];
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

      //nouveau accidents
      var new_acc = document.getElementById('SIUUU');
      parsedResponse.nouveau_accident.forEach(element => {
        new_acc.innerHTML +=
          "<tr class='nouv_accident'>" +
          "<td>" + element['horodatage'] + "</td>" +
          "<td>" + element['latitude'] + "</td>" +
          "<td>" + element['longitude'] + "</td>" +
          "<td>" + element['an_naiss_conduct'] + "</td>" +
          "<td>" + element['insee'] + "</td>" +
          "<td>" + element['lum'] + "</td>" +
          "<td>" + element['athmo'] + "</td>" +
          "<td>" + element['etat_route'] + "</td>" +
          "<td>" + element['dispo_secu'] + "</td>" +
          "<td>" + "<button class='button' onclick='get_pred(" + element['id_acc'] + ")'>Gravité</button>" + "</td>" +
          "</tr>";
      });

      var new_latitude = [];
      var new_longitude = [];
      var new_lum = [];
      var new_ville = [];
      var new_athmo = [];
      var new_secu = [];
      var new_surface = [];
      var new_date = [];

      parsedResponse.nouveau_accident.forEach(element => {
        new_latitude.push(element['latitude']);
        new_longitude.push(element['longitude']);
        new_lum.push(element['lum']);
        new_ville.push(element['ville']);
        new_athmo.push(element['athmo']);
        new_secu.push(element['dispo_secu']);
        new_surface.push(element['etat_route']);
        new_date.push(element['horodatage']);
      });

      var new_trace = {
        type: 'scattermapbox',
        lat: new_latitude,
        lon: new_longitude,
        mode: 'markers',
        marker: {
          size: 10,
          color: 'rgb(0, 255, 0)',
          opacity: 1
        },
        text: new_date.map(function (value, index) {
          return "Date:" + value + "<br>Ville:" + new_ville[index] + "<br>Lum:" + new_lum[index] + "<br>Athmo:" + new_athmo[index] + "<br>Secu:" + new_secu[index] + "<br>Surface:" + new_surface[index];
        })
      };

      var new_layout = {
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

      var new_data = [new_trace];

      Plotly.newPlot('map2', new_data, new_layout);

    },
    error: function (xhr, status, error) {
      console.log('Erreur Ajax');
      console.log('Status:', status);
      console.log('Error:', error);
      console.log('Response:', xhr.responseText);
    }

  });

});


cleanFilterBtn.addEventListener("click", function () {
  selectedFiltersElem.innerHTML = "";
  document.getElementById("athmo").value = "all";
  document.getElementById("ville").value = "";
  document.getElementById("age").value = "all";
  document.getElementById("secu").value = "all";
  document.getElementById("surf").value = "all";
  document.getElementById("lumi").value = "all";

  // Réinitialiser les filtres
  for (var category in filters) {
    filters[category] = [];
    selectedFilters[category] = [];
    existingFilters[category] = [];
  }

  siuuu= document.getElementById('SIUUU');
  siuuu.innerHTML="";

  var trace = {
    type: 'scattermapbox',
    lat: [],
    lon: [],
    mode: 'markers',
    marker: {
      size: 10,
      color: '#1E1E1E',
      opacity: 0.7
    },
    text: []
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

  Plotly.newPlot('map2', data,layout);

  Plotly.newPlot('map', data, layout);

});