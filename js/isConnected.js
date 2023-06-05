'use strict'

ajaxRequest("GET", 'php/request.php/isConnected/', isConnected);


function isConnected(sessionLink) {
    if (sessionLink) {
        
        console.log(sessionLink);
    }
    // else{
    //     //window.location.replace("index.html");
    // }
}

$('#deconnexion').click(() =>
    {   
        console.log('deconnexion');
        //alert(valpwd.value);
        ajaxRequest("GET", 'php/request.php/disconnected', disconnected );
    }
);

function disconnected(sessionLink) {
    window.location.replace("index.html");
    console.log("disconneted");
}

