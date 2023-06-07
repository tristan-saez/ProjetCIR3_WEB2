'use strict';

// Vérifier si l'utilisateur a déjà accepté les cookies
if (!localStorage.getItem('cookiesAccepted')) {
    // Afficher la pop-up des cookies
    document.getElementById('cookiePopup').classList.add('active');
  }

  document.getElementById('cookiePopup').classList.add('active');
  
  // Écouter les événements des boutons
  document.getElementById('acceptCookies').addEventListener('click', function() {
    // Enregistrer la décision de l'utilisateur dans le stockage local
    // ----------------------
    //localStorage.setItem('cookiesAccepted', true);
    var max = document.getElementById('cookie_max');
    console.log(max.value);
    // ajaxRequest("POST", 'php/request.php/filtre', "cookies_max=" + max.value );  
    // Masquer la pop-up des cookies
    document.getElementById('cookiePopup').style.display = 'none';
  });
  
  document.getElementById('declineCookies').addEventListener('click', function() {
    // Supprimer la décision précédente de l'utilisateur du stockage local
    // ----------------------
    //localStorage.removeItem('cookiesAccepted');

    // Masquer la pop-up des cookies
    document.getElementById('cookiePopup').style.display = 'none';
  });
  