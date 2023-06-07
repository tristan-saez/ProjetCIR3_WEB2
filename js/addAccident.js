'use strict';

ajaxRequest('POST', 'php/request.php/listLum', listeLum);
ajaxRequest('POST', 'php/request.php/listAthmo', listeAthmo);
ajaxRequest('POST', 'php/request.php/listRoute', listeRoute);
ajaxRequest('POST', 'php/request.php/listDispo_secu', listeDispo_secu);

var valDate = document.getElementById('DateTime');
var valAn_nais = document.getElementById('Age');
var valInsee = document.getElementById('ville');
var valLum = document.getElementById('lumi_select');
var valAthmo = document.getElementById('atmo_select');
var valRoute = document.getElementById('route_select');
var valSecu = document.getElementById('secu_select');

$('#addAccident').click((event) => {
    event.preventDefault();

    // var string = valInsee.value;

    // var pattern = /insee:\s*(\d+)/i;
    // var matches = string.match(pattern);

    // if (matches) {
    //     var code_insee = matches[1];
    //     console.log("INSEE code: " + code_insee);
    // } else {
    //     console.log("No INSEE code found.");
    // }
    let insee = valInsee.value.split(" ")[3].replace(")", "")
    console.log(valDate.value +
        "&an_nais_conduct=" + valAn_nais.value + "&insee=" + insee + "&lum=" +
        valLum.value + "&athmo=" + valAthmo.value + "&etat_route=" + valRoute.value +
        "&dispo_secu=" + valSecu.value)
    
    ajaxRequest("POST", 'php/request.php/addAccident', addAccident, "horodatage=" + valDate.value +
        "&an_nais_conduct=" + valAn_nais.value + "&insee=" + insee + "&lum=" +
        valLum.value + "&athmo=" + valAthmo.value + "&etat_route=" + valRoute.value +
        "&dispo_secu=" + valSecu.value);
}
);


function addAccident(data) {
    console.log(data);
    if (data == "request") {
        alert("Un problème lors de la requête est survenu");
    }
    else if (data == "successful") {
        alert("Accident created successfully !");
        window.location.replace("visu.html");
    }else if(data == "connection"){
        alert("Une erreur a eu lieu durant la connection");
    }
}

function listeLum(tab_lum) {
    // console.log(tab_lum);
    var selectLum = document.getElementById('lumi_select');
    
    tab_lum.forEach(lum => {
        selectLum.innerHTML +=
        `<option value="${lum['lum']}">${lum['lum']}</option>` ;
    });
}

function listeAthmo(tab_athmo) {
    // console.log(tab_athmo);
    var selectAthmo = document.getElementById('atmo_select');
    
    tab_athmo.forEach(athmo => {
        selectAthmo.innerHTML +=
        `<option value="${athmo['athmo']}">${athmo['athmo']}</option>` ;
    });
}

function listeRoute(tab_route) {
    var selectRoute = document.getElementById('route_select');
    // console.log(tab_route);
    tab_route.forEach(route => {
        selectRoute.innerHTML +=
        `<option value="${route['etat_route']}">${route['etat_route']}</option>` ;
    });
}

function listeDispo_secu(tab_secu) {
    var selectSecu = document.getElementById('secu_select');
    tab_secu.forEach(secu => {
        selectSecu.innerHTML +=
        `<option value="${secu['dispo_secu']}">${secu['dispo_secu']}</option>`;
    });
}