'use strict';

var id_match = location.search;
id_match = id_match.replace("?id_match=",'');

console.log(id_match);

ajaxRequest('POST', 'php/request.php/listSport/', listeSport);

ajaxRequest('POST', 'php/request.php/listCity/', listeCity);

ajaxRequest("GET", 'php/request.php/request_mMatch/', request_mMatch, "id_match="+id_match);

var manage_city = document.getElementById('city');
var manage_date = document.getElementById('date');
var manage_sport = document.getElementById("sport");
var manage_max_p = document.getElementById('max-p');
var manage_address = document.getElementById('address');
var manage_period = document.getElementById('period');
var manage_price = document.getElementById('price');

var manage_best_player = document.getElementById('best_player');
var manage_score = document.getElementById('score');

$('#form_edit_match').submit((event) =>
    {   
        event.preventDefault();
        // console.log(id_match);
        ajaxRequest('POST', 'php/request.php/editMatch/', editMatch, 
        "id="+id_match+ "&ville="+manage_city.value+"&date="+manage_date.value
        +"&sport="+manage_sport.value+"&max_player="+manage_max_p.value 
        +"&address="+manage_address.value +"&period="+manage_period.value
        +"&price="+manage_price.value);
    });

function editMatch(data){
    console.log(data);
}

$('#form_stats_match').submit((event) =>
    {   
        event.preventDefault();
        // console.log(id_match);
        ajaxRequest('POST', 'php/request.php/statMatch/', statMatch, "id="+id_match + "&score="+manage_score.value);
    });

function statMatch(data){
    console.log(data);
}

function request_mMatch(data){
    manage_city.value = data.code_insee;
    console.log("date: " + data.date_match);
    data.date_match.replace(" ", "T");
    manage_date.value = data.date_match;
    manage_sport.value = data.nom_sport;
    manage_max_p.value = data.nb_max_joueurs;
    manage_address.value = data.address_match;
    manage_period.value = data.duree;
    manage_price.value = data.prix;
}


function listeSport(tab_sport) {
    // console.log(tab_sport);
    var selectSport = document.getElementById('sport');
    
    tab_sport.forEach(sport => {
        selectSport.innerHTML +=
            "<option value=" + sport['nom_sport'] + ">" + sport['nom_sport'] + "</option>" ;
    });
}

function listeCity(tab_city) {
    var selectSport = document.getElementById('city');
    tab_city.forEach(city => {
        selectSport.innerHTML +=
            "<option value=" + city['code_insee'] + ">" + city['nom_ville'] + "</option>" ;
    });
}