'use strict';


ajaxRequest('POST', 'php/request.php/listSport/', listeSport);

ajaxRequest('POST', 'php/request.php/listCity/', listeCity);

var selectSport = document.getElementById('sport');
var valMaxPlayers = document.getElementById('maxPlayers');
var valaddress = document.getElementById('address');
var selectCity = document.getElementById('city');
var valDate = document.getElementById('date');
var valTime = document.getElementById('time');
var valPrice = document.getElementById('price');

$('#createEventId').click((event) =>
    {   
        event.preventDefault();
        // console.log(valTime.value);
        // console.log(valPrice.value);
        // console.log(valaddress.value);
        // console.log(valDate.value);
        // console.log(valMaxPlayers.value);
        // console.log(selectCity.value);
        ajaxRequest("POST", 'php/request.php/createEvent', createEvent ,"sport="+selectSport.value+
                                "&maxPlayers="+valMaxPlayers.value+"&address="+valaddress.value+
                                "&city="+selectCity.value+"&date="+valDate.value+"&time="+
                                valTime.value+"&price="+valPrice.value);
    }
);

function createEvent(data) {
    
    if (!data) {
        alert("You cannot create this event !");
    }
    if (data) {
        alert("Event created successfully !");
        window.location.replace("matchs.html");
    }else{
        alert("Error !");
    }
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
