<?php
  require_once('constants.php');

  //Connection à la Base de Données
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

  //Ajoute un accident à la table accident(nouvel accident) de la BDD
  function dbInsertAccident($db, $horodatage, $an_nais, $insee, $lum, $athmo, $route, $dispo_secu, $cat_veh, $inter, $type_col)
  {
    try {
        $horodatage = date_create(str_replace("T", " ", $horodatage));
        $horodatage = date_format($horodatage, 'Y-m-d H:i:s');

        $an_nais = date("Y", strtotime($an_nais.' years ago'));

        $request2 = 'INSERT INTO accident (horodatage, an_naiss_conduct, insee, lum, athmo, etat_route, dispo_secu, descr_cat_veh, descr_inter, descr_type_col) VALUES ';
        $request2 .= '(:horodatage, :an_nais, :insee, :lum, :athmo, :route, :dispo_secu, :descr_cat_veh, :descr_inter, :descr_type_col)';

        $statement = $db->prepare($request2);

        $statement->bindParam(':horodatage', $horodatage, PDO::PARAM_STR, 20);
        $statement->bindParam(':an_nais', $an_nais, PDO::PARAM_STR, 4);
        $statement->bindParam(':insee', $insee, PDO::PARAM_STR, 20);
        $statement->bindParam(':lum', $lum, PDO::PARAM_STR, 200);
        $statement->bindParam(':athmo', $athmo, PDO::PARAM_STR, 200);
        $statement->bindParam(':route', $route, PDO::PARAM_STR, 200);
        $statement->bindParam(':dispo_secu', $dispo_secu, PDO::PARAM_STR, 200);
        $statement->bindParam(':descr_cat_veh', $cat_veh, PDO::PARAM_STR, 200);
        $statement->bindParam(':descr_inter', $inter, PDO::PARAM_STR, 200);
        $statement->bindParam(':descr_type_col', $type_col, PDO::PARAM_STR, 200);

        try {
            $statement->execute();
            return "successful";
        } catch(PDOException $exception) {
            error_log('Request error: ' . $exception->getMessage());
            return "request";
        }
    } catch (PDOException $exception) {
        error_log('Request error: ' . $exception->getMessage());
        return "connection";
    }
  }

  //Retourne la liste des villes
  function dbRequestCity($db)
  {
    $request = 'SELECT ville,insee FROM ville';
    $statement = $db->prepare($request);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    if ($result == '') {
      return false;
    } else {
      return $result;
    }
  }

  //Retourne la liste des Luminosités
  function dbRequestLum($db)
  {
    $request = 'SELECT lum FROM condition_lum';
    $statement = $db->prepare($request);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    if ($result == '') {
      return false;
    } else {
      return $result;
    }
  }

  //Retourne la liste des condi Atmo
  function dbRequestAthmo($db)
  {
    $request = 'SELECT athmo FROM condition_athmo';
    $statement = $db->prepare($request);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    if ($result == '') {
      return false;
    } else {
      return $result;
    }
  }

  //Retourne la liste des routes
  function dbRequestRoute($db)
  {
    $request = 'SELECT etat_route FROM condition_route';
    $statement = $db->prepare($request);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    if ($result == '') {
      return false;
    } else {
      return $result;
    }
  }

  //Retourne la liste des dispo de sécu
  function dbRequestDispo_secu($db)
  {
    $request = 'SELECT dispo_secu FROM condition_secu';
    $statement = $db->prepare($request);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    if ($result == '') {
      return false;
    } else {
      return $result;
    }
  }

  //Retourne la liste des catégorie de véhicule
  function dbRequestCat_veh($db)
  {
    $request = 'SELECT cat_veh FROM descr_cat_veh';
    $statement = $db->prepare($request);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    if ($result == '') {
      return false;
    } else {
      return $result;
    }
  }

  //Retourne la liste des intersections
  function dbRequestInter($db)
  {
    $request = 'SELECT inter FROM descr_inter';
    $statement = $db->prepare($request);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    if ($result == '') {
      return false;
    } else {
      return $result;
    }
  }

  //Retourne la liste des types de collisions
  function dbRequestType_col($db)
  {
    $request = 'SELECT type_col FROM descr_type_col';
    $statement = $db->prepare($request);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    if ($result == '') {
      return false;
    } else {
      return $result;
    }
  }

  //Retourne la liste des anciens accidents
  function dbRequestAncienAcc($db)
  {
    if(isset($_COOKIE['cookie_max'])){
      $cookie_max = $_COOKIE['cookie_max'];
    }else{
      $cookie_max = 50;
    }
    $request = "SELECT DATE_FORMAT(ac.date, \"%d/%m/%Y %H:%i\") 'date', ac.ville, ac.id_code_insee, ac.latitude, ac.longitude, ac.descr_athmo, ac.descr_lum, ac.descr_etat_surf, ac.an_nais, ac.descr_dispo_secu  FROM ancien_acc ac LIMIT :cookie_limit;";
    $statement = $db->prepare($request);
    $statement->bindParam(':cookie_limit', $cookie_max, PDO::PARAM_INT, 3);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    return $result;
  }

  function dbRequestAccident($db){
    $request = "SELECT *, DATE_FORMAT(ac.horodatage, \"%d/%m/%Y %H:%i\") 'horodatage' from accident ac join  ville on ac.insee = ville.insee;";
    $statement = $db->prepare($request);
    $statement->execute();
    $result=$statement->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }

  //Utilisé pour le script python
  function dbRequestCluster($db) {
    $request = "SELECT v.latitude, v.longitude FROM accident ac JOIN ville v ON ac.insee = v.insee;";
    $statement = $db->prepare($request);
    $statement->execute();
    $result=$statement->fetchAll(PDO::FETCH_ASSOC);
    
    $lat = [];
    $lon = [];
    foreach($result as $value) {
      array_push($lat, $value["latitude"]);
      array_push($lon, $value["longitude"]);
    }

    $request_py = "python /var/www/etu110/cgi/get_input.py arguments='kmeans'," . implode("_", $lat) . "," . implode("_", $lon);
    
    //on utilise exec pour exécuter la commande python avec les argument de request_py
    exec($request_py, $result_py);
    return $result_py;
  }

  //
  function dbRequestGrav($db, $id_acc) {
    $request = "SELECT cv.id 'cat_veh', i.id 'inter', tc.id 'type_col', l.id 'lum',  ac.an_naiss_conduct 'an_naiss', v.latitude, v.longitude FROM accident ac
    join descr_cat_veh cv on ac.descr_cat_veh = cv.cat_veh
    join descr_inter i on ac.descr_inter = i.inter
    join descr_type_col tc on ac.descr_type_col = tc.type_col
    join condition_lum l on ac.lum = l.lum
    join ville v on v.insee = ac.insee
    WHERE ac.id_acc = :id_acc;";
    $statement = $db->prepare($request);
    $statement->bindParam(':id_acc', $id_acc, PDO::PARAM_STR, 20);
    $statement->execute();
    $result=$statement->fetchAll(PDO::FETCH_ASSOC); 

    //On récupère les premieres lignes du résultat pour utiliser comme argument, argument est un tableau
    $arguments = [$result[0]["cat_veh"], $result[0]["lum"], $result[0]["inter"], $result[0]["type_col"], $result[0]["an_naiss"], $result[0]["latitude"], $result[0]["longitude"]];

    $request_py = "python /var/www/etu110/cgi/get_input.py arguments='classification'," . implode("_", $arguments);

    exec($request_py, $result_py);
    return $result_py;
  }

?>
