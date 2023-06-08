var filterToggle = document.getElementById("filter-toggle");
var filterMenu = document.getElementById("filter-menu");
var applyFilterBtn = document.getElementById("apply-filter");
var selectedFiltersElem = document.getElementById("selected-filters");
var cleanFilterBtn = document.getElementById("clean-filter-btn");

filterToggle.addEventListener("click", function() {
  if (filterMenu.style.display === "block") {
    filterMenu.style.display = "none";
  } else {
    filterMenu.style.display = "block";
  }
});

var filters = {
  type: [],
  ville: [],
  age: [],
  lumi: [],
  secu: [],
  surf: []
};

var selectedFilters = {
  type: [],
  ville: [],
  age: [],
  lumi: [],
  secu: [],
  surf: []
};

var existingFilters = {
  type: [],
  ville: [],
  age: [],
  lumi: [],
  secu: [],
  surf: []
};

applyFilterBtn.addEventListener("click", function() {
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

  if (villeFilter !== "all" && villeFilter !== "" && !existingFilters.ville.includes(villeFilter)) {
    filters.ville.push(villeFilter);
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
  for (var category in selectedFilters) {
    for (var i = 0; i < selectedFilters[category].length; i++) {
      selectedFiltersHTML += '<div class="selected-filter">' + selectedFilters[category][i] + '<span class="remove-filter" onclick="removeFilter(this, \'' + category + '\', \'' + selectedFilters[category][i] + '\')">x</span></div>';
    }
  }

  selectedFiltersElem.innerHTML = selectedFiltersHTML;


  $.ajax({
  url: 'php/filtre.php',
  method: 'POST',
  data: { filters: filters },
  success: function(response) {
    console.log('Requête Ajax réussie');
    console.log(response);
  },
  error: function(xhr, status, error) {
    console.log('Erreur Ajax');
    console.log('Status:', status);
    console.log('Error:', error);
    console.log('Response:', xhr.responseText);
  }
  
  });

});





function removeFilter(elem, category, filter) {
  var selectedFilter = elem.parentNode;
  selectedFilter.parentNode.removeChild(selectedFilter);

  // Retirer le filtre de la catégorie correspondante
  var index = selectedFilters[category].indexOf(filter);
  if (index !== -1) {
    selectedFilters[category].splice(index, 1);
  }
}

cleanFilterBtn.addEventListener("click", function() {
  selectedFiltersElem.innerHTML = "";
  document.getElementById("athmo").value = "all";
  document.getElementById("ville").value = "all";
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

  console.log(filters);
});