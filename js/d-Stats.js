'use strict';

ajaxRequest("GET", 'php/request.php/requestProfil/', requestProfil);

function requestProfil(data){
    // console.log(data.nombre_matchs_joue);
    var stat = document.getElementById('display_stats');
    stat.innerHTML += "<h2>Game played: "+ data.nombre_matchs_joue +"</h2>";

    var id = document.getElementById('identity');
    id.innerHTML += '<img class="img-fluid" src="img/profil.svg" width="200">'+
    '<h3 class="text-white mt-3">'+ data.nom.toUpperCase() + "  "+ data.prenom +"</h3>";
}