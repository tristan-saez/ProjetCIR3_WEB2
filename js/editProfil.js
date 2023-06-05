'use strict';

ajaxRequest("GET", 'php/request.php/requestProfil/', requestProfil);

var profil_city = document.getElementById('ville');
var profil_birth = document.getElementById('date_naissance');
var profil_photo = document.getElementById("photo");
var profil_fphysique = document.getElementById('forme_physique');
var profil_pwd1 = document.getElementById('pw1');
var profil_pwd2 = document.getElementById('pw2');
var grade = document.getElementById('grade');

// function grading (obj)
// {
// 	if (obj.href)
// 		alert(obj.href);
// }

$('#form_edit_p').submit((event) =>
    {   
        // event.preventDefault();
        // console.log('form_edit_p');
        if(checkPassword()){
            ajaxRequest('POST', 'php/request.php/editProfil/', editProfil, 
            "ville="+profil_city.value+"&date_de_naissance="+profil_birth.value
            +"&mdp="+profil_pwd1.value+"&forme_physique="+profil_fphysique.value);
        }else{
            alert("Passwords do not match!")
        }
        
    });

function editProfil(data){
    console.log(data);
}

function requestProfil(data){
    profil_city.value = data.nom_ville;
    document.getElementById('date_naissance').value = data.date_de_naissance;
    document.getElementById('forme_physique').value = data.forme_physique;

    var id = document.getElementById('identity');
    id.innerHTML += '<img class="img-fluid" src="img/profil.svg" width="200">'+
    '<h3 class="text-white mt-3">'+ data.nom.toUpperCase() + "  "+ data.prenom +"</h3>";
    
}

function checkPassword() {
    // console.log(valpwd1.value);
    // console.log(valpwd2.value);
    if (profil_pwd1.value == profil_pwd2.value) {
        return true;
    } else {
        return false;
    }
}




   