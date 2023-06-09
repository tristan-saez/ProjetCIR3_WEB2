<?php
    require_once('database.php');
    require_once('constants.php');


    
    // Database connexion.
    $db = dbConnect();
    if (!$db)
    {
    header ('HTTP/1.1 503 Service Unavailable');
    exit;
    }


  if (isset($_POST['filters'])) {

      $filters = $_POST['filters'];

      foreach ($filters as $category => $values) {
        $valueCount = count($values);
        for ($i = 0; $i < $valueCount; $i++) {
         $values[$i] = formatFilterValue($values[$i]);
        }
        $filters[$category] = $values;
      }

      $athmo = $ville = $age = $lumi = $secu = $surf = [];
      $athmo2 = $ville2 = $age2 = $lumi= $secu2 = $surf2 =[];

      $request = "SELECT DATE_FORMAT(ac.date, \"%d/%m/%Y %H:%i\") 'date', ac.ville, ac.id_code_insee, ac.latitude, ac.longitude, ac.descr_athmo, ac.descr_lum, ac.descr_etat_surf, ac.an_nais, ac.descr_dispo_secu  FROM ancien_acc ac WHERE ";
      $request2 = "SELECT * FROM accident as acc JOIN ville on acc.insee = ville.insee WHERE ";

      //implode sert à fractionner un tableau en une chaine de caratère 
      //Detection si $filters['type]
      if (!empty($filters['type'])) {
         $typeValues = "'" . implode("', '", $filters['type']) . "'";
         $request .= "descr_athmo IN ($typeValues) AND ";
         $request2 .= "athmo IN ($typeValues) AND ";
      }
  
      if (!empty($filters['ville'])) {
        $villeValues = "'" . implode("', '", $filters['ville']) . "'";
        $request .= "ac.id_code_insee IN ($villeValues) AND ";
        $request2 .= "acc.insee IN ($villeValues) AND ";
    }
    
  
      if (!empty($filters['age'])) {
         $ageConditions = [];
             $ageConditions2 = []; // Explode sert à fractionner une chaine de caractère en un tableau avec le separateur en parametre
        foreach ($filters['age'] as $ageRange) {
           $ageRange = explode(" ", $ageRange);
            $minAge = $ageRange[0];
            $maxAge = $ageRange[1];
            $ageConditions[] = "(age BETWEEN $minAge AND $maxAge) ";
            $ageConditions2[] = "(TIMESTAMPDIFF(YEAR, CONCAT(acc.an_naiss_conduct, '-01-01'), NOW()) BETWEEN $minAge AND $maxAge) ";
          }
        $ageCondition = implode(" OR ", $ageConditions);
        $request .= "($ageCondition) AND ";
        $ageCondition2 = implode(" OR ", $ageConditions2);
        $request2 .= "($ageCondition2) AND ";
      }

      //Detection caté filtre existe et concatenation script SQL
      if (!empty($filters['lumi'])) {
          $lumiValues = "'" . implode("', '", $filters['lumi']) . "'";
          $request .= "descr_lum IN ($lumiValues) AND ";
          $request2 .= "acc.lum IN ($lumiValues) AND ";
        }
  
  
        if (!empty($filters['surf'])) {
          $surfValues = "'" . implode("', '", $filters['surf']) . "'";
          $request .= "descr_etat_surf IN ($surfValues) AND ";
          $request2 .= "acc.etat_route IN ($surfValues) AND ";
        } 
        
        if (!empty($filters['secu'])) {
          $secuValues = "'" . implode("', '", array_map('addslashes', $filters['secu'])) . "'";
          $request .= "descr_dispo_secu IN ($secuValues) AND ";
          $request2 .= "acc.dispo_secu IN ($secuValues) AND ";
        }
        
        //rtrim supprime le dernier à droite d'une chaine de caractère en fonction du parametre
        $request = rtrim($request, " AND ");
        $request .= " LIMIT :cookie_limit;";

        // .= concatène LIMIT 20 à la fin
        $request2 =rtrim($request2, " AND " );
        $request2 .= " LIMIT 20;";

        $data = trier($request, $db);
        $data2 = trier($request2, $db);
        $response = array('message' => 'Donnees recues avec succes', 'ancien_accident' => $data, 'nouveau_accident' => $data2);

        echo json_encode($response,JSON_UNESCAPED_UNICODE);
        exit;
      }else {
        $request = "SELECT DATE_FORMAT(ac.date, \"%d/%m/%Y %H:%i\") 'date', ac.ville, ac.id_code_insee, ac.latitude, ac.longitude, ac.descr_athmo, ac.descr_lum, ac.descr_etat_surf, ac.an_nais, ac.descr_dispo_secu  FROM ancien_acc ac LIMIT :cookie_limit;";
        
        $request2 =  "SELECT *, DATE_FORMAT(ac.horodatage, \"%d/%m/%Y %H:%i\") 'horodatage' from accident ac join  ville on ac.insee = ville.insee LIMIT 10 ;";
        $data = trier($request, $db);
        $data2 = trier($request2, $db);


        $response = array('message' => 'Aucune donnee postee','ancien_accident' =>$data, 'nouveau_accident' => $data2);
        echo json_encode($response,JSON_UNESCAPED_UNICODE);
        exit;
    }

//Formate les filtres
function formatFilterValue($value) {
    // Remplacer '-' par ' '
    $value = str_replace('-', ' ', $value);

    // Remplacer '---' par ' - '
    $value = str_replace('   ', ' - ', $value);
   
    return $value;
  }

//Requete finale avec les cookies
function trier($request, $db) {
  if(isset($_COOKIE['cookie_max'])){
    $cookie_max = $_COOKIE['cookie_max'];
  }else{
    $cookie_max = 50;
  }
  
  $statement = $db->prepare($request);
  $statement->bindParam(':cookie_limit', $cookie_max, PDO::PARAM_INT, 3);

  $statement->execute();
  $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}







?>
