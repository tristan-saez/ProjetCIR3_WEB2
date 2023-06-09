'use strict';
//récupère les listes des paramètres d'accident pour les filtres
ajaxRequest('POST', 'php/request.php/listLum', listeLum);
ajaxRequest('POST', 'php/request.php/listAthmo', listeAthmo);
ajaxRequest('POST', 'php/request.php/listRoute', listeRoute);
ajaxRequest('POST', 'php/request.php/listDispo_secu', listeDispo_secu);



var valAge = document.getElementById("Age");
var valcity = document.getElementById("Ville");
var valLum = document.getElementById("lumi");
var valAthmo = document.getElementById("athmo");

//applique les filtres lors de l'appui du bouton
$('#apply-filter').click((event) =>
    {   
        event.preventDefault();
        ajaxRequest("POST", 'php/request.php/filtre', filtrage ,"athmo="+valAthmo.value+"&an_nais="+valAge.value+"&lum="+valLum.value);
    }
);

//Callback du filtrage
function filtrage(tab_acc) {

}

//affiche la liste des différentes luminosité
function listeLum(tab_lum) {
    var selectLum = document.getElementById('lumi');
    
    tab_lum.forEach(lum => {
        selectLum.innerHTML +=
            "<option value=" + lum['lum'].replace(/ /g,'-') + ">" + lum['lum'] + "</option>" ;
    });
}

//affiche la liste des états athmosphériques
function listeAthmo(tab_athmo) {
    var selectAthmo = document.getElementById('athmo');
    
    tab_athmo.forEach(athmo => {
        selectAthmo.innerHTML +=
            "<option value=" + athmo['athmo'].replace(/ /g,'-') + ">" + athmo['athmo'] + "</option>" ;
    });
}

//affiche la liste des états de la route
function listeRoute(tab_route) {
    var selectRoute = document.getElementById('surf');
    tab_route.forEach(route => {
        selectRoute.innerHTML +=
        "<option value=" + route['etat_route'].replace(/ /g,'-') + ">" + route['etat_route'] + "</option>" ;
    });
}

//affiche la liste des dispositifs de sécutité
function listeDispo_secu(tab_secu) {
    var selectSecu = document.getElementById('secu');
    tab_secu.forEach(secu => {
        selectSecu.innerHTML +=
        "<option value=" + secu['dispo_secu'].replace(/ /g,'-') + ">" + secu['dispo_secu'] + "</option>" ;
    });
}
