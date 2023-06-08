'use strict';

ajaxRequest('POST', 'php/request.php/listLum', listeLum);
ajaxRequest('POST', 'php/request.php/listAthmo', listeAthmo);
ajaxRequest('POST', 'php/request.php/listRoute', listeRoute);
ajaxRequest('POST', 'php/request.php/listDispo_secu', listeDispo_secu);

ajaxRequest('POST', 'php/request.php/listCat_veh', listeCat_veh);
ajaxRequest('POST', 'php/request.php/listInter', listeInter);
ajaxRequest('POST', 'php/request.php/listType_col', listeType_col);

var valDate = document.getElementById('DateTime');
var valAn_nais = document.getElementById('Age');
var valInsee = document.getElementById('ville');
var valLum = document.getElementById('lumi_select');
var valAthmo = document.getElementById('atmo_select');
var valRoute = document.getElementById('route_select');
var valSecu = document.getElementById('secu_select');

var valCat_veh = document.getElementById('cat_veh_select');
var valInter = document.getElementById('inter_select');
var valType_col = document.getElementById('type_col_select');

$('#addAccident').click((event) => {

    event.preventDefault();

    let insee = valInsee.value.split(" ")[3].replace(")", "")
    console.log(valDate.value +
        "&an_nais_conduct=" + valAn_nais.value + "&insee=" + insee + "&lum=" +
        valLum.value + "&athmo=" + valAthmo.value + "&etat_route=" + valRoute.value +
        "&dispo_secu=" + valSecu.value + "&descr_cat_veh=" + valCat_veh.value + 
        "&descr_inter=" + valInter.value + "&descr_type_col=" + valType_col.value)
    
    ajaxRequest("POST", 'php/request.php/addAccident', addAccident, "horodatage=" + valDate.value +
        "&an_nais_conduct=" + valAn_nais.value + "&insee=" + insee + "&lum=" +
        valLum.value + "&athmo=" + valAthmo.value + "&etat_route=" + valRoute.value +
        "&dispo_secu=" + valSecu.value + "&descr_cat_veh=" + valCat_veh.value + 
        "&descr_inter=" + valInter.value + "&descr_type_col=" + valType_col.value);
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

function listeCat_veh(tab_cat_veh) {
    var selectCat_veh = document.getElementById('cat_veh_select');
    tab_cat_veh.forEach(cat_veh => {
        selectCat_veh.innerHTML +=
        `<option value="${cat_veh['cat_veh']}">${cat_veh['cat_veh']}</option>`;
    });
}

function listeInter(tab_inter) {
    var selectInter = document.getElementById('inter_select');
    tab_inter.forEach(inter => {
        selectInter.innerHTML +=
        `<option value="${inter['inter']}">${inter['inter']}</option>`;
    });
}

function listeType_col(tab_type_col) {
    var selectType_col = document.getElementById('type_col_select');
    tab_type_col.forEach(type_col => {
        selectType_col.innerHTML +=
        `<option value="${type_col['type_col']}">${type_col['type_col']}</option>`;
    });
}