<?php
    //--------------------------------------request.php-------------------------------------------
    
//-----------EDIT-PROFIL--------------

//Request Profil Info w/ SESSION
if ($requestMethod == 'GET') {
    if ($requestRessource == 'requestProfil') {
        if (isset($_SESSION['email']))
            $data = dbRequestProfil_edit($db, $_SESSION['email']);
    }
}

//Edit profil
if ($requestMethod == 'POST') {
    if ($requestRessource == 'editProfil') {
        // var_dump($_POST);
        // echo $_SESSION['email'];
        // var_dump($_POST);
        if (isset($_SESSION['email']) && isset($_POST['date_de_naissance']) && isset($_POST['ville']) && isset($_POST['forme_physique'])){

            //var_dump($_POST['forme_physique']);
            // echo $_POST['date_de_naissance'], $_POST['mdp'], $_SESSION['email'], $_POST['ville'], $_POST['forme_physique'];
            $data = dbUpdateProfil($db, $_POST['date_de_naissance'], $_POST['mdp'], $_SESSION['email'], $_POST['ville'], $_POST['forme_physique']);
            // $data = "insertplace";
        }
        else {
            // echo "nok";
            $data = "false";
        }
    }
}

//----------AFFICHAGE MATCH ORGANISATEUR-----------

if ($requestMethod == 'POST') {
    if ($requestRessource == 'listeManageMatch') {
        if (isset($_SESSION['email']))
            $data = dbRequestManageMatch($db, $_SESSION['email']);
    }
}


//----------MANAGE MATCH--------------

//Request Match Info w/ SESSION and id
if ($requestMethod == 'GET') {
    if ($requestRessource == 'request_mMatch') {
        if (isset($_SESSION['email']))
            $data = dbRequestMatch_edit($db, $_SESSION['email'], $_GET['id_match']);
            // echo $data;
    }
}

//Edit Match
if ($requestMethod == 'POST') {
    if ($requestRessource == 'editMatch') {
        var_dump($_POST);
        // echo $_SESSION['email'];

        if (isset($_POST["id"]) && isset($_POST['ville']) && isset($_POST['date']) &&
        isset($_POST['sport']) && isset($_POST['max_player']) && isset($_POST['address']) && 
        isset($_POST['period']) && isset($_POST['price'])){
            $data = "true";

            $data = dbUpdateMatch($db, $_POST['ville'], $_POST['date'], $_POST['sport'], $_POST['max_player'],
            $_POST['address'], $_POST['period'], $_POST['price'], $_POST['id'], $_SESSION['email']);
        }
        else {
            echo "nok";
            $data = "false";
        }
        // var_dump($_POST);
    }
}

if ($requestMethod == 'POST') {
    if ($requestRessource == 'statMatch') {
        var_dump($_POST);
        // echo $_SESSION['email'];

        if (isset($_POST["score"]) && isset($_POST['id']) && $_SESSION['email']){
            $data = "true";

            $data = dbInsertStat($db, $_POST['score'], $_POST['id'], $_SESSION['email']);
        }
        else {
            echo "nok";
            $data = "false";
        }
        // var_dump($_POST);
    }
}

//------------------------------database.php--------------------------------------
  //UPDATE PROFIL
  function dbUpdateProfil($db, $date_de_naissance, $mdp, $email, $ville, $forme_physique)
  {
    try
    {
      $request1 = 'SELECT code_insee FROM ville
                    WHERE nom_ville=:ville';
      $statement1 = $db->prepare($request1);
      $statement1->bindParam(':ville', $ville, PDO::PARAM_STR, 58);
      $statement1->execute();
      
      $code_insee = $statement1->fetch(PDO::FETCH_ASSOC)['code_insee'];

      if(isset($email) && isset($date_de_naissance) && isset($ville) && isset($forme_physique) && empty($mdp)){
        $request2 = "UPDATE profil SET date_de_naissance=:date_de_naissance, code_insee=:code_insee, forme_physique=:forme_physique WHERE email=:email";
        $statement = $db->prepare($request2);

        $statement->bindParam(':date_de_naissance', $date_de_naissance, PDO::PARAM_STR, 20);
        $statement->bindParam(':email', $email, PDO::PARAM_STR, 75);
        $statement->bindParam(':code_insee', $code_insee, PDO::PARAM_STR, 6);
        $statement->bindParam(':forme_physique', $forme_physique, PDO::PARAM_STR, 30);
      }elseif(isset($email) && isset($date_de_naissance) && isset($ville) && isset($forme_physique) && isset($mdp)){
        $request2 = "UPDATE profil SET date_de_naissance=:date_de_naissance, code_insee=:code_insee, forme_physique=:forme_physique, mdp=:mdp WHERE email=:email";
        $statement = $db->prepare($request2);

        $statement->bindParam(':date_de_naissance', $date_de_naissance, PDO::PARAM_STR, 20);
        $statement->bindParam(':email', $email, PDO::PARAM_STR, 75);
        $statement->bindParam(':mdp', $mdp, PDO::PARAM_STR, 160);
        $statement->bindParam(':code_insee', $code_insee, PDO::PARAM_STR, 6);
        $statement->bindParam(':forme_physique', $forme_physique, PDO::PARAM_STR, 30);
      }
      
      if($statement->execute()){
        // echo "execute ok";
        return true;
      }else{
        // echo "execute nok";
        return false;
      }


    }

    catch (PDOException $exception)
    {
      error_log('Request error: '.$exception->getMessage());
      return false;
    }
  }

  //Recupere les info du profil a modif
  function dbRequestProfil_edit($db, $email)
  {
    try
    { 
      $request = 'SELECT v.nom_ville, p.date_de_naissance, p.forme_physique, p.nombre_matchs_joue, p.nom, p.prenom FROM profil p JOIN ville v ON p.code_insee = v.code_insee';

      if ($email != '')
        $request .= ' WHERE p.email=:email';
      $statement = $db->prepare($request);

      if ($email != '')
        $statement->bindParam(':email', $email, PDO::PARAM_STR, 75);
      $statement->execute();
      $result = $statement->fetch(PDO::FETCH_ASSOC);
      
      // var_dump($result);
      return $result;
    }

    catch (PDOException $exception)
    {
      error_log('Request error: '.$exception->getMessage());
      return false;
    }
  }

  //recupère les matchs d'organisé par le profil de la session
  function dbRequestManageMatch($db, $email){
    $request = 'SELECT * FROM all_match WHERE email=:email LIMIT 8';
    $statement = $db->prepare($request);
    $statement->bindParam(':email', $email);
    $statement->execute();
    // var_dump($statement);
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    if ($result == '') {
      return false;
    } else {
      return $result;
    }
  }

  //EDIT MATCH

// nom_ville;
// date_match;
// nom_sport;
// nb_max_joueurs;
// address_match;
// duree;
// prix;

  function dbUpdateMatch($db, $ville, $date_match, $nom_sport, $nb_max_joueurs, $address_match, $duree, $prix, $id_match, $email)
  {
    try
    {
      if(isset($date_match) && isset($nom_sport) && isset($nb_max_joueurs) && isset($address_match) && isset($duree) && isset($prix) && isset($id_match)){
        $request2 = "UPDATE all_match SET nb_max_joueurs=:nb_max_joueurs , code_insee=:code_insee, date_match=:date_match, nom_sport=:nom_sport, address_match=:address_match, duree=:duree, prix=:prix WHERE email=:email AND id_match=:id_match";
        $statement = $db->prepare($request2);

        $statement->bindParam(':nb_max_joueurs', $nb_max_joueurs);
        $statement->bindParam(':email', $email);
        $statement->bindParam(':code_insee', $ville);
        $statement->bindParam(':date_match', $date_match);
        $statement->bindParam(':nom_sport', $nom_sport);
        $statement->bindParam(':address_match', $address_match);
        $statement->bindParam(':duree', $duree);
        $statement->bindParam(':prix', $prix);
        $statement->bindParam(':id_match', $id_match);
      }
      
      if($statement->execute()){
        // echo "execute ok";
        return true;
      }else{
        // echo "execute nok";
        return false;
      }


    }

    catch (PDOException $exception)
    {
      error_log('Request error: '.$exception->getMessage());
      return false;
    }
  }

  //Recupere les info du Match a modif
  function dbRequestMatch_edit($db, $email, $id_match)
  {
    try
    { 
      $request = 'SELECT v.nom_ville, s.nom_sport, m.date_match, m.nb_max_joueurs, m.address_match, m.duree, m.prix, m.code_insee FROM all_match m INNER JOIN ville v ON m.code_insee = v.code_insee INNER JOIN sport s ON m.nom_sport = s.nom_sport';

      if ($email != '')
        $request .= ' WHERE m.email=:email AND m.id_match=:id_match';
      $statement = $db->prepare($request);

      if ($email != '')
        $statement->bindParam(':email', $email);
        $statement->bindParam(':id_match', $id_match);
      // var_dump($statement);
      $statement->execute();
      $result = $statement->fetch(PDO::FETCH_ASSOC);
      
      // var_dump($result);
      return $result;
    }

    catch (PDOException $exception)
    {
      error_log('Request error: '.$exception->getMessage());
      return false;
    }
  }

  function dbInsertStat($db, $score, $id_match, $email)
  {
    try
    {
      if(isset($score) && isset($id_match)){
        $request2 = "UPDATE all_match SET  score=:score WHERE email=:email AND id_match=:id_match";
        $statement = $db->prepare($request2);

        $statement->bindParam(':score', $score);
        $statement->bindParam(':email', $email);
        $statement->bindParam(':id_match', $id_match);
      }
      
      if($statement->execute()){
        // echo "execute ok";
        return true;
      }else{
        // echo "execute nok";
        return false;
      }


    }

    catch (PDOException $exception)
    {
      error_log('Request error: '.$exception->getMessage());
      return false;
    }
  }
?>