'use strict';

ajaxRequest('POST', 'php/request.php/listLum', listeLum);
ajaxRequest('POST', 'php/request.php/listAthmo', listeAthmo);




var valAge = document.getElementById("Age");
var valcity = document.getElementById("Ville");
var valLum = document.getElementById("lumi");
var valAthmo = document.getElementById("athmo");

$('#apply-filter').click((event) =>
    {   
        event.preventDefault();
        console.log(valAge.value);
        ajaxRequest("POST", 'php/request.php/filtre', filtrage ,"athmo="+valAthmo.value+"&an_nais="+valAge.value+"&lum="+valLum.value);
    }
);

function filtrage(tab_acc) {
    var selectAcc = document.getElementById('tabble_acc');
    selectAcc.innerHTML = "";

//     console.log(tab_match);
//     //listeMatch(data);
//     if (document.getElementById('notfullid').checked === true) {
//         var selectSport = document.getElementById('match_content');
//         tab_match.forEach(match => {
//             if (match['nb_max_joueurs'] != match['nb_joueurs_inscrits']) {
//                 selectSport.innerHTML += 
//                 "<div class="+"'bg-light mt-3 me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden'"+">"+
//                 "<div>"+
//                     "<img src="+"img/"+match['nom_sport'].toLowerCase()+".svg"+" width='50' height='50'>"+
//                 "</div>"+
//                 "<div class="+"mb-3 p-3"+">"+
//                     "<h2 class="+"display-5"+">Match #"+match['id_match']+"</h2>"+
//                     "<p class="+"lead"+">"+match['nom_sport']+"</p>"+
//                     "<p class="+"card-text mb-0"+">"+match['address_match']+"</p>"+
//                     "<p class="+"card-text mb-0"+">"+"Maximum players : "+match['nb_max_joueurs']+"</p>"+
//                     "<p class="+"card-text mb-0"+">"+"Players enrolled : "+match['nb_joueurs_inscrits']+"</p>"+
//                     "<p class="+"card-text mb-0"+">"+match['date_match']+"</p>"+
//                 "</div>"+
//                 "<div class="+"'position-relative bg-dark shadow-sm mx-auto'"+" style="+"'width: 80%; height: 200px; border-radius: 21px 21px 0 0;'"+">"+
//                     "<div class="+"'position-absolute bottom-0 start-50 translate-middle'"+">"+
//                     "<a href="+"info-matchs.html"+"<button type="+"button" +" class="+"'btn btn-primary mx-auto'"+">Enroll</button></a>"+
//                     "</div>"+
//                 "</div>"+
//                 "</div>";
//             }
            
    }

function listeLum(tab_lum) {
    //console.log(tab_lum);
    var selectLum = document.getElementById('lumi');
    
    tab_lum.forEach(lum => {
        selectLum.innerHTML +=
            "<option value=" + lum['lum'] + ">" + lum['lum'] + "</option>" ;
    });
}

function listeAthmo(tab_athmo) {
    // console.log(tab_athmo);
    var selectAthmo = document.getElementById('athmo');
    
    tab_athmo.forEach(athmo => {
        selectAthmo.innerHTML +=
            "<option value=" + athmo['athmo'] + ">" + athmo['athmo'] + "</option>" ;
    });
}
