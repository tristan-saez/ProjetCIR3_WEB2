<?php
  require_once('constants.php');

  function dbConnect()
  {
    try
    {
      $db = new PDO('mysql:host='.DB_SERVER.';dbname='.DB_NAME.';charset=utf8',
        DB_USER, DB_PASSWORD);
      $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
    }
    catch (PDOException $exception)
    {
      error_log('Connection error: '.$exception->getMessage());
      return false;
    }
    return $db;
  }

/*
function dbRequestProfils($db, $email, $mdp)
  {
    try
    {
      $request = 'SELECT mdp FROM profil';

      if ($email != '')
        $request .= ' WHERE email=:email';
      $statement = $db->prepare($request);

      if ($email != '')
        $statement->bindParam(':email', $email, PDO::PARAM_STR, 75);
      $statement->execute();
      $result = $statement->fetchAll(PDO::FETCH_ASSOC);

      // var_dump($mdp);
      // var_dump($result[0]['mdp']);

      if ($result) {
        $password = $result[0]['mdp'];
      } else {
        return "email doesn't exist";
      }
      
      if (password_verify($mdp, $password)){
        return "true";
      }else {
        return "false";
      }


    }

    catch (PDOException $exception)
    {
      error_log('Request error: '.$exception->getMessage());
      return false;
    }
  }

  function dbInsertProfils($db, $nom, $prenom, $date_de_naissance, $email, $mdp, $ville, $forme_physique)
  {
    try
    {
      $request0 = 'SELECT email FROM profil
                        WHERE email=:email';
      $statement0 = $db->prepare($request0);
      $statement0->bindParam(':email', $email, PDO::PARAM_STR, 75);
      $statement0->execute();
      $result0 = $statement0->fetchAll(PDO::FETCH_ASSOC);

      if ($result0 == '') {
          return "Email already exit !";
      }

      $request1 = 'SELECT code_insee FROM ville
                    WHERE nom_ville=:ville';
      $statement1 = $db->prepare($request1);
      $statement1->bindParam(':ville', $ville, PDO::PARAM_STR, 58);
      $statement1->execute();
      // var_dump($statement1);
      $code_insee = $statement1->fetchAll(PDO::FETCH_ASSOC)[0]['code_insee'];
      // var_dump($code_insee);
      $request2 = 'INSERT INTO profil (nom, prenom, date_de_naissance, email, mdp, code_insee, forme_physique) VALUES';

      $request2 .= '(:nom, :prenom, :date_de_naissance, :email, :mdp, :code_insee, :forme_physique)';
      $statement = $db->prepare($request2);

      $hashpass = password_hash($mdp,PASSWORD_DEFAULT);
      $statement->bindParam(':nom', $nom, PDO::PARAM_STR, 50);
      $statement->bindParam(':prenom', $prenom, PDO::PARAM_STR, 50);
      $statement->bindParam(':date_de_naissance', $date_de_naissance, PDO::PARAM_STR, 20);
      $statement->bindParam(':email', $email, PDO::PARAM_STR, 75);
      $statement->bindParam(':mdp', $hashpass , PDO::PARAM_STR, 160);
      $statement->bindParam(':code_insee', $code_insee, PDO::PARAM_STR, 6);
      $statement->bindParam(':forme_physique', $forme_physique, PDO::PARAM_STR, 30);
      
      $statement->execute();

      return true;
    }

    catch (PDOException $exception)
    {
      error_log('Request error: '.$exception->getMessage());
      return false;
    }
  }

  function dbInsertEvent($db, $sport, $maxPlayers, $address, $City, $date1, $duree, $price)
  {
    try
    {
      $date1 = str_replace('T',' ',$date1);
      $date1 .= ":00";
      $duree .= ":00";

      $email = $_SESSION['email'];
      $request2 = 'INSERT INTO all_match ( nb_max_joueurs, date_match, nb_joueurs_inscrits, address_match, duree, prix, email, code_insee, nom_sport) VALUES ';

      $request2 .= '( :nb_max_joueurs, :date_match, 0, :address_match, :duree, :prix, :email, :code_insee, :nom_sport)';

      // $request2 = 'INSERT INTO all_match (email, code_insee, nom_sport) VALUES ';

      // $request2 .= '(:email, :code_insee, :nom_sport)';

      $statement = $db->prepare($request2);

      $statement->bindParam(':nb_max_joueurs', $maxPlayers, PDO::PARAM_INT, 2);

      $statement->bindParam(':date_match', $date1, PDO::PARAM_STR, 20);

      // $valzero = 0;
      // $statement->bindParam(':nb_joueurs_inscrits', $valzero, PDO::PARAM_INT, 2);

      $statement->bindParam(':address_match', $address, PDO::PARAM_STR, 160);
      $statement->bindParam(':duree', $duree, PDO::PARAM_STR, 10);
      $statement->bindParam(':prix', $price);
      
      // echo "$email + $City + $sport";
      $statement->bindParam(':email', $email, PDO::PARAM_STR, 75);
      $statement->bindParam(':code_insee', $City, PDO::PARAM_STR, 6);
      $statement->bindParam(':nom_sport', $sport, PDO::PARAM_STR, 30);
      
      //var_dump($statement);

      if ($statement->execute()) {
        //echo "execute OK !";
        return true;
      }else {
        //echo "execute NOK !";
        return false;
      }
      // return true;
    }

    catch (PDOException $exception)
    {
      error_log('Request error: '.$exception->getMessage());
      return false;
    }

  }

  function dbRequestSport($db)
  {
    $request = 'SELECT nom_sport FROM sport';
    $statement = $db->prepare($request);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    if ($result == '') {
      return false;
    } else {
      return $result;
    }
    
    
  }

  function dbRequestCity($db)
  {
    $request = 'SELECT nom_ville,code_insee FROM ville';
    $statement = $db->prepare($request);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    if ($result == '') {
      return false;
    } else {
      return $result;
    }
    
  }

  function dbRequestAllMatch($db)
  {
    $request = 'SELECT * FROM all_match LIMIT 8';
    $statement = $db->prepare($request);
    $statement->execute();
    // var_dump($statement);
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    if ($result == '') {
      return false;
    } else {
      return $result;
    }
  }

  function dbRequestMatch($db, $sport, $ville, $periode)
  {

    $request = 'SELECT * FROM all_match';

    $montest = false;

    if ($sport != '0') {
      if ($montest == false) {
        $request .= ' WHERE ';
        $montest = true;
      }else {
        $request .= ' AND ';
      }
      $request .= 'nom_sport=:sport';
      
    }

    if ($ville != '0') {
      if ($montest == false) {
        $request .= ' WHERE ';
        $montest = true;
      }else {
        $request .= ' AND ';
      }
      $request .= 'code_insee=:code_insee';
      // $statement->bindParam(':code_insee', $ville, PDO::PARAM_STR, 20);
    }

    if ($periode != '0') {
      if ($montest == false) {
        $request .= ' WHERE ';
        $montest = true;
      }else {
        $request .= ' AND ';
      }
      $request .= ':periode<DATEDIFF(NOW(),date_match) AND DATEDIFF(NOW(),date_match)<0';
      // $statement->bindParam(':periode', $periode, PDO::PARAM_STR, 20);
    }


    $request .= ' LIMIT 8';

    $statement = $db->prepare($request);

    if ($periode != '0') {
      $statement->bindParam(':periode', $periode, PDO::PARAM_STR, 20);
    }
    if ($ville != '0') {
      $statement->bindParam(':code_insee', $ville, PDO::PARAM_STR, 20);
    }
    if ($sport != '0') {
      $statement->bindParam(':sport', $sport, PDO::PARAM_STR, 20);
    }

    $statement->execute();
    
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    if ($result == '') {
      return false;
    } else {
      return $result;
    }
  }

  function dbRequestMesMatch1($db)
  {
    $request = "SELECT am.*, ej.id_match, ej.email, v.nom_ville FROM est_joueur ej INNER JOIN all_match am INNER JOIN ville v ON am.code_insee = v.code_insee WHERE ej.email=:email AND am.id_match=ej.id_match AND DATEDIFF(NOW(),am.date_match)<0";
    // SELECT am.*, ej.id_match, ej.email FROM est_joueur ej JOIN all_match am WHERE ej.email='patrick.balkany@levallois.rch' AND am.id_match=ej.id_match;
    $statement = $db->prepare($request);
    $statement->bindParam(':email', $_SESSION['email']);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);


    // var_dump($result);
    if ($result == '') {
      return false;
    } else {
      return $result;
    }
  }
  function dbRequestMesMatch2($db)
  {
    $request = "SELECT am.*, ej.id_match, ej.email, v.nom_ville FROM est_joueur ej INNER JOIN all_match am INNER JOIN ville v ON am.code_insee = v.code_insee WHERE ej.email=:email AND am.id_match=ej.id_match AND DATEDIFF(NOW(),am.date_match)>0";
    // SELECT am.*, ej.id_match, ej.email FROM est_joueur ej JOIN all_match am WHERE ej.email='patrick.balkany@levallois.rch' AND am.id_match=ej.id_match;
    $statement = $db->prepare($request);
    $statement->bindParam(':email', $_SESSION['email']);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);


    // var_dump($result);
    if ($result == '') {
      return false;
    } else {
      return $result;
    }
  }


  function dbRequestMatchById($db, $id)
  {
    
    $request = 'SELECT * FROM all_match am JOIN ville v ON am.code_insee = v.code_insee WHERE am.id_match=:id';
    $statement = $db->prepare($request);
    $statement->bindParam(':id', $id);
    $statement->execute();

    $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    // var_dump($result);
    if ($result == '') {
      return false;
    } else {
      return $result;
    }
    
  }
  function dbRequestAllPlayerById($db,$id)
  {
    $request = 'SELECT e.id_match,e.email , p.nom, p.prenom FROM est_joueur e JOIN profil p ON e.email=p.email WHERE id_match=:id
                ';
    $statement = $db->prepare($request);
    $statement->bindParam(':id', $id);
    $statement->execute();

    $result = $statement->fetchAll(PDO::FETCH_ASSOC);


    // var_dump($result);
    if ($result == '') {
      return false;
    } else {
      return $result;
    }
  }
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
          $hashpass = password_hash($mdp,PASSWORD_DEFAULT);
          $statement->bindParam(':mdp', $hashpass, PDO::PARAM_STR, 160);
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
  
    function dbRequestManageMatch($db, $email)
    {
      $request = 'SELECT * FROM all_match WHERE email=:email';
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

    function dbInsertPlayerMatch($db, $id, $email)
    {
      $pre_request = "SELECT COUNT(*) FROM est_joueur WHERE id_match=:id_match AND email=:email";
      $pre_statement = $db->prepare($pre_request);
      // var_dump($id);
      // var_dump($_SESSION['email']);
      $pre_statement->bindParam(':id_match', $id);
      $pre_statement->bindParam(':email', $email);
      $pre_statement->execute();
      // var_dump($pre_statement);
      $pre_result = $pre_statement->fetch(PDO::FETCH_ASSOC);

      // var_dump($pre_result["COUNT(*)"]);

      if ($pre_result["COUNT(*)"] == 0) {
        $request = "INSERT INTO est_joueur (id_match,email,demande,est_buteur,est_meilleur_joueur) VALUES (:id_match, :email, 'd', 'false', 'false');";
        $statement = $db->prepare($request);
        $statement->bindParam(':id_match', $id);
        $statement->bindParam(':email', $email);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
      }else {
        $result = '';
      }

      if ($result == '') {
        return false;
      } else {
        return true;
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
  

?>
