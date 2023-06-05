'use strict';

ajaxRequest('POST', 'php/request.php/listeManageMatch/', listeManageMatch);

function listeManageMatch(tab_match) {
    console.log(tab_match);
    var selectManage = document.getElementById('my_manage');
    tab_match.forEach(match => {
        selectManage.innerHTML +=   
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
          "<a href="+"'manage.html?id_match="+match['id_match']+"' <button type="+"button" +" class="+"'btn btn-primary mx-auto'"+">Manage</button></a>"+
        "</div>"+
      "</div>"+
    "</div>";
    });
}





    