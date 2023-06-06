'use strict';

ajaxRequest('POST', 'php/request.php/listCity/', listeCity);
ajaxRequest('POST', 'php/request.php/listLum/', listeLum);
ajaxRequest('POST', 'php/request.php/listAthmo/', listeAthmo);
ajaxRequest('POST', 'php/request.php/listRoute/', listeRoute);
ajaxRequest('POST', 'php/request.php/listeDispo_secu/', listeDispo_secu);

var valDate = document.getElementById('horodatage');
var valLat = document.getElementById('latitude');
var valLong = document.getElementById('longitude');
var valAn_nais = document.getElementById('an_nais_conduct');
var valInsee = document.getElementById('insee');
var valLum = document.getElementById('lum');
var valAthmo = document.getElementById('athmo');
var valRoute = document.getElementById('route');
var valSecu = document.getElementById('dispo_secu');

$('#addAccident').click((event) =>
    {   
        event.preventDefault();
        ajaxRequest("POST", 'php/request.php/addAccident', addAccident ,"horodatage="+valDate.value+
                                "&latitude="+valLat.value+"&longitude="+valLong.value+
                                "&an_nais_conduct="+valAn_nais.value+"&insee="+valInsee.value+"&lum="+
                                valLum.value+"&athmo="+valAthmo.value+"&route="+valRoute.value+
                                "&dispo_secu="+valSecu.value);
    }
);


function createEvent(data) {
    
    if (!data) {
        alert("You cannot create this event !");
    }
    if (data) {
        alert("Event created successfully !");
        window.location.replace("homepage.html");
    }else{
        alert("Error !");
    }
}

function listeLum(tab_lum) {
    // console.log(tab_lum);
    var selectLum = document.getElementById('lumi_select');
    
    tab_lum.forEach(lum => {
        selectLum.innerHTML +=
            "<option value=" + lum['lum'] + ">" + lum['lum'] + "</option>" ;
    });
}

function listeCity(tab_city) {
    var selectCity = document.getElementById('ville');
    tab_city.forEach(city => {
        selectCity.innerHTML +=
            "<option value=" + city['code_insee'] + ">" + city['ville'] + "</option>" ;
    });
}

function listeAthmo(tab_athmo) {
    // console.log(tab_athmo);
    var selectAthmo = document.getElementById('atmo_select');
    
    tab_athmo.forEach(athmo => {
        selectAthmo.innerHTML +=
            "<option value=" + athmo['athmo'] + ">" + athmo['athmo'] + "</option>" ;
    });
}

function listeRoute(tab_route) {
    var selectRoute = document.getElementById('route_select');
    tab_route.forEach(route => {
        selectRoute.innerHTML +=
            "<option value=" + route['route'] + ">" + route['route'] + "</option>" ;
    });
}

function listeDispo_secu(tab_secu) {
    var selectSecu = document.getElementById('secu_select');
    tab_secu.forEach(secu => {
        selectSecu.innerHTML +=
            "<option value=" + secu['dispo_secu'] + ">" + secu['dispo_secu'] + "</option>" ;
    });
}