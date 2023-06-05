'use strict';

var valemail = document.getElementById('exampleInputEmail1');
var valpwd = document.getElementById('exampleInputPassword1');
$('#identification').submit((event) =>
    {   
        event.preventDefault();
        // console.log(crypt(valpwd.value));
        //alert(valpwd.value);
        
        ajaxRequest('POST', 'php/request.php/login/', currentLogin, "email="+valemail.value+"&mdp="+valpwd.value);
    }
);

function currentLogin(test) {
    console.log(test);
    if (test == "email don't exist") {
        alert("email don't exist !");
    }
    if (test == "false") {
        alert("Incorrect password !");
    }else{
        window.location.replace("matchs.html");
    }
};
 