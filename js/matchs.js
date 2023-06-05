'use strict';

ajaxRequest('POST', 'php/request.php/listSport/', listeSport);

ajaxRequest('POST', 'php/request.php/listCity/', listeCity);

ajaxRequest('POST', 'php/request.php/listMatch/', listeMatch);

var valsport = document.getElementById("sport");
var valcity = document.getElementById("city");
var valperiod = document.getElementById("period");

$('#filtre').click((event) =>
    {   
        event.preventDefault();
        console.log(valperiod.value);
        ajaxRequest("POST", 'php/request.php/filtre', filtrage ,"sport="+valsport.value+"&city="+valcity.value+"&period="+valperiod.value);
    }
);

// $('#enrollId').click((event) =>
//     {
//         event.preventDefault();
//         // console.log(location.search);
//         // ajaxRequest("GET", 'php/request.php/monoMatch', afficheMatch, );
//     }
// );


function filtrage(tab_match) {
    var selectSport = document.getElementById('match_content');
    selectSport.innerHTML = "";

    console.log(tab_match);
    //listeMatch(data);
    if (document.getElementById('notfullid').checked === true) {
        var selectSport = document.getElementById('match_content');
        tab_match.forEach(match => {
            if (match['nb_max_joueurs'] != match['nb_joueurs_inscrits']) {
                selectSport.innerHTML += 
                "<div class="+"'bg-light mt-3 me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden'"+">"+
                "<div>"+
                    "<img src="+"img/"+match['nom_sport'].toLowerCase()+".svg"+" width='50' height='50'>"+
                "</div>"+
                "<div class="+"mb-3 p-3"+">"+
                    "<h2 class="+"display-5"+">Match #"+match['id_match']+"</h2>"+
                    "<p class="+"lead"+">"+match['nom_sport']+"</p>"+
                    "<p class="+"card-text mb-0"+">"+match['address_match']+"</p>"+
                    "<p class="+"card-text mb-0"+">"+"Maximum players : "+match['nb_max_joueurs']+"</p>"+
                    "<p class="+"card-text mb-0"+">"+"Players enrolled : "+match['nb_joueurs_inscrits']+"</p>"+
                    "<p class="+"card-text mb-0"+">"+match['date_match']+"</p>"+
                "</div>"+
                "<div class="+"'position-relative bg-dark shadow-sm mx-auto'"+" style="+"'width: 80%; height: 200px; border-radius: 21px 21px 0 0;'"+">"+
                    "<div class="+"'position-absolute bottom-0 start-50 translate-middle'"+">"+
                    "<a href="+"info-matchs.html"+"<button type="+"button" +" class="+"'btn btn-primary mx-auto'"+">Enroll</button></a>"+
                    "</div>"+
                "</div>"+
                "</div>"                      ; 
            }
            
    })
    
    }else{
        var selectSport = document.getElementById('match_content');
        tab_match.forEach(match => {

            selectSport.innerHTML += 
            "<div class="+"'bg-light mt-3 me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden'"+">"+
            "<div>"+
                "<img src="+"img/"+match['nom_sport'].toLowerCase()+".svg"+" width='50' height='50'>"+
            "</div>"+
        "<div class="+"mb-3 p-3"+">"+
            "<h2 class="+"display-5"+">Match #"+match['id_match']+"</h2>"+
            "<p class="+"lead"+">"+match['nom_sport']+"</p>"+
            "<p class="+"card-text mb-0"+">"+match['address_match']+"</p>"+
            "<p class="+"card-text mb-0"+">"+"Maximum players : "+match['nb_max_joueurs']+"</p>"+
            "<p class="+"card-text mb-0"+">"+"Players enrolled : "+match['nb_joueurs_inscrits']+"</p>"+
            "<p class="+"card-text mb-0"+">"+match['date_match']+"</p>"+
        "</div>"+
        "<div class="+"'position-relative bg-dark shadow-sm mx-auto'"+" style="+"'width: 80%; height: 200px; border-radius: 21px 21px 0 0;'"+">"+
            "<div class="+"'position-absolute bottom-0 start-50 translate-middle'"+">"+
            "<a href="+"info-matchs.html"+"<button type="+"button" +" class="+"'btn btn-primary mx-auto'"+">Enroll</button></a>"+
            "</div>"+
        "</div>"+
        "</div>"                      ;

        })
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

function listeMatch(tab_match) {
    console.log(tab_match);
    var selectSport = document.getElementById('match_content');
    tab_match.forEach(match => {
        selectSport.innerHTML += 
        "<div class="+"'bg-light mt-3 me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden'"+">"+
        "<div>"+
            "<img src="+"img/"+match['nom_sport'].toLowerCase()+".svg"+" width='50' height='50'>"+
        "</div>"+
      "<div class="+"mb-3 p-3"+">"+
        "<h2 class="+"display-5"+">Match #"+match['id_match']+"</h2>"+
        "<p class="+"lead"+">"+match['nom_sport']+"</p>"+
        "<p class="+"card-text mb-0"+">"+match['address_match']+"</p>"+
        "<p class="+"card-text mb-0"+">"+"Maximum players : "+match['nb_max_joueurs']+"</p>"+
        "<p class="+"card-text mb-0"+">"+"Players enrolled : "+match['nb_joueurs_inscrits']+"</p>"+
        "<p class="+"card-text mb-0"+">"+match['date_match']+"</p>"+
      "</div>"+
      "<div class="+"'position-relative bg-dark shadow-sm mx-auto'"+" style="+"'width: 80%; height: 200px; border-radius: 21px 21px 0 0;'"+">"+
        "<div class="+"'position-absolute bottom-0 start-50 translate-middle'"+">"+
          "<a href='info-matchs.html?id="+match['id_match']+"' <button id='enrollId' type="+"button" +" class="+"'btn btn-primary mx-auto'"+">Enroll</button></a>"+
        "</div>"+
      "</div>"+
    "</div>"                      ;
    });
}
