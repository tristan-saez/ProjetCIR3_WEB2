'use strict';

ajaxRequest('POST', 'php/request.php/mesMatchs/', afficheMesMatchs);

function afficheMesMatchs(data) {
    console.log(data);
    var selectMatch = document.getElementById('match_content');
        data.forEach(match => {
            selectMatch.innerHTML += 
            // "<section class='d-flex my-5 mx-5 justify-content-between'>"+
            "<div class='alert bg-light mt-3 me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden fade show'>"+
                "<div>"+
                    "<img src='img/"+match['nom_sport']+".svg' width='50'>"+
                "</div>"+
              "<div class='mb-3 p-3'>"+
                "<h2 value="+ match['id_match'] +" class='display-5'>Match #"+ match['id_match'] +"</h2>"+
                "<p class='lead'>Sport : "+match['nom_sport']+"</p>"+
                "<p class='card-text mb-0'>City : "+match['nom_ville']+"</p>"+
                "<p class='card-text mb-0'>"+match['address_match']+"</p>"+
                "<p class='card-text mb-0'>Max players : "+match['nb_max_joueurs']+"</p>"+
                "<p class='card-text mb-0'>Nb of Players Enrolled : "+match['nb_joueurs_inscrits']+"</p>"+
                "<p class='card-text mb-0'>Date : "+match['date_match']+"</p>"+
              "</div>"+
              "<div class='position-relative bg-dark shadow-sm mx-auto' style='height: 150px; border-radius: 21px 21px 0 0;'>"+
                "<div class='position-absolute bottom-0 start-50 translate-middle'>"+
                    "<button type='button' class='btn btn-primary mx-auto' data-bs-dismiss='alert'>Disenroll</button>"+
                  "</div>"+
              "</div>"+
            "</div>";
            
        });        
}