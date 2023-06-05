'use strict';

// ajaxRequest("GET", 'php/request.php/monoMatch', afficheMatch, );
// console.log(location.search);

var id = location.search;
id = id.replace("?id=",'');

// console.log(id);



ajaxRequest('POST', 'php/request.php/monoMatch/', afficheMatch, "id="+id);
ajaxRequest('POST', 'php/request.php/allPlayers/', affichePlayers, "id="+id);
$('#enrollement').click(() =>
    {   
        // event.preventDefault();
        console.log("sociss");
        var valemail = document.getElementById('email');
        var valIdMatch = document.getElementById('id_match');


        ajaxRequest('POST', 'php/request.php/inscriptionMatch/', inscription_match, "id_match="+id);
        
    }
);

function afficheMatch(data) {
    console.log(data);
    var selectSport = document.getElementById('match_content');
        data.forEach(match => {
            selectSport.innerHTML += 
            // "<section class='d-flex my-5 mx-5 justify-content-between'>"+
            "<div class='p-2 align-self-center'>"+
                "<div>"+
                    "<img src='img/"+match['nom_sport'].toLowerCase()+".svg' class='align-self-center' style='max-width : 300px; max-height : 300px;'>"+
                "</div>"+
            "</div>"+

            "<div class='p-2'>"+
                "<div class='mb-3 p-3 mx-5'>"+
                    "<h2 id='id_match' value="+ match['id_match'] +" class='display-5'>Match #"+match['id_match']+"</h2>"+
                    "<p class='lead'>"+match['nom_sport']+"</p>"+
                    "<p class='lead'>Organizer : "+match['email']+"</p>"+
                    "<p class='card-text mb-0'>"+match['address_match']+"</p>"+
                    "<p class='card-text mb-0'>"+match['nom_ville']+"</p>"+
                    "<p class='card-text mb-0'>"+match['nb_max_joueurs']+"</p>"+
                    "<p class='card-text mb-0'>"+match['nb_joueurs_inscrits']+"</p>"+
                    "<p class='card-text mb-0'>"+match['date_match']+"</p>"+
                    "<p class='card-text mb-0'>"+match['duree']+"</p>"+
                    "<p class='card-text mb-0'>"+match['prix']+"</p>"+
                    "</div>"+
            "</div>";
            
        //       "<div class='ms-auto p-2'>"+
        //         "<button id='enrollement' type='submit' class='btn btn-primary align-self-start btn-lg'>Enroll</button>"+
        //       "</div>"+
        //   "</section>" ;
        });                     
    }

function affichePlayers(data) {
    console.log(data);
    var selectPlayer = document.getElementById('player_content');
        data.forEach(player => {
            selectPlayer.innerHTML += 
                "<div class='card mx-2 my-2' style='width: 12rem;'>"+
                "    <img src='img/profil.svg' class='card-img-top'>"+
                "    <div class='card-body text-center'>"+
                "        <h5 id='email' value="+ player['email'] +" class='card-title'>"+player['email']+"</h5>"+
                "        <h5 class='card-title'>"+player['nom']+ " / "+  player['prenom']+"</h5>"+
                "    </div>"+
                "</div>"
            ;
        });                     
}



function inscription_match(data) {
    if (data) {
        console.log(data)
        window.location.replace("matchs.html");
    }else{
        alert("You're already enrolled !")
    }
}

