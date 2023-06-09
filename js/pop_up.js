'use strict';

// Vérifier si l'utilisateur a déjà accepté les cookies
if (!localStorage.getItem('cookiesAccepted')) {
    // Afficher la pop-up des cookies
    document.getElementById('cookiePopup').classList.add('active');
  }

  document.getElementById('cookiePopup').classList.add('active');
  
  // Écouter les événements des boutons
  document.getElementById('acceptCookies').addEventListener('click', function() {
    var max = document.getElementById('cookie_max');
    cookie('cookie_max', max.value, 1);
    document.getElementById('cookiePopup').style.display = 'none';
  });
  
  document.getElementById('declineCookies').addEventListener('click', function() {
    document.getElementById('cookiePopup').style.display = 'none';
  });

  //Récupère les infos pour cookies et envoit vers back-end
  function cookie(name, value, hours) {
    var expires = '';
    if (hours) {
      var date = new Date();
      date.setTime(date.getTime() + hours * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=../php/';
  }