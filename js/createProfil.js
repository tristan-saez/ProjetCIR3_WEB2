'use strict';

var valname = document.getElementById('name');
var vallastname = document.getElementById('lastname');
var valcity = document.getElementById('city');
var valbirth = document.getElementById('birth');
var valemail = document.getElementById('email');
var valforme_physique = document.getElementById('forme_physique');
var valpwd1 = document.getElementById('pwd1');
var valpwd2 = document.getElementById('pwd2');
var valphoto = document.getElementById("photo");

$('#inscription').submit((event) =>
    {   
        event.preventDefault();
        //alert(valpwd1.value);
        if (checkPassword()) {
          ajaxRequest('POST', 'php/request.php/inscription/', currentInscription, 
            "nom="+vallastname.value+"&prenom="+valname.value+"&date_de_naissance="
            +valbirth.value+"&email="+valemail.value+"&mdp="+valpwd1.value+"&ville="+valcity.value+"&forme_physique="
            +valforme_physique.value);
        // alert(valname.value);
        }else{
          alert("Password don't match !");
        }
        
    }
);

function currentInscription(data) {
    console.table(data);
    if (data == true) {
        window.location.replace("index.html");
    }
    if (data == "Email already exit !") {
        alert("Email already exit !");
    }
}

function checkPassword() {
    // console.log(valpwd1.value);
    // console.log(valpwd2.value);
    if (valpwd1.value == valpwd2.value) {
        // alert("bloblot");
        return true;
    } else {
        // alert("pas bloblot");
        return false;
    }
}

function showPassword1() {
    if (valpwd1.type === "password") {
      valpwd1.type = "text";
    } else {
      valpwd1.type = "password";
    }
  }

function showPassword2() {
    
    if (valpwd2.type === "password") {
      valpwd2.type = "text";
    } else {
      valpwd2.type = "password";
    }
  }
