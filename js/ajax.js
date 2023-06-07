'use strict';

function ajaxRequest(type, url, callback, data = null)
{
  let xhr;

  // Create XML HTTP request.
  xhr = new XMLHttpRequest();
  if (type == 'GET' && data != null){
    //alert(data);
    url += '?' + data;
  }
  xhr.open(type, url);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Add the onload function.
  xhr.onload = () =>
  {
    //alert(data);
    switch (xhr.status)
    {
      case 200:
        // alert(data);
      case 201:
        // alert(data);
        // console.log('1');
        // console.log(xhr.responseText);
        // console.log('2');
        callback(JSON.parse(xhr.responseText));
        break;
      default:
        httpErrors(xhr.status);
    }
  };

  // Send XML HTTP request.
  xhr.send(data);
}

//------------------------------------------------------------------------------
//--- httpErrors ---------------------------------------------------------------
//------------------------------------------------------------------------------
// Display an error message accordingly to an error code.
// \param errorCode The error code (HTTP status for example).
function httpErrors(errorCode)
{
  let messages =
  {
    400: 'Requête incorrecte',
    401: 'Authentifiez vous',
    403: 'Accès refusé',
    404: 'Page non trouvée',
    500: 'Erreur interne du serveur',
    503: 'Service indisponible'
  };

  // Display error.
  if (errorCode in messages)
  {
    $('#errors').html('<strong>' + messages[errorCode] + '</strong>');
    $('#errors').show();
    setTimeout(() =>
    {
      $('#errors').hide();
    }, 5000);
  }
}
