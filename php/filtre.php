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

    // Check the request.
    $requestMethod = $_SERVER['REQUEST_METHOD'];
    $request = substr($_SERVER['PATH_INFO'], 1);
    $request = explode('/', $request);
    $requestRessource = array_shift($request);

    // Check the id associated to the request.
    $id = array_shift($request);

    if ($id == '') $id = NULL;
    $data = false;

  
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

  $request = "SELECT * FROM  ancien_acc WHERE ";
  $request2 = "SELECT * FROM accident as acc JOIN ville on acc.insee == ville.insee WHERE";

      if (!empty($filters['type'])) {
         $typeValues = "'" . implode("', '", $filters['type']) . "'";
         $request .= "descr_athmo IN ($typeValues) AND ";
         $request2 .= "athmo IN ($typeValues) AND";
      }
  
      if (!empty($filters['ville'])) {
        $villeValues = "'" . implode("', '", $filters['ville']) . "'";
        $request .= "ville IN ($villeValues) AND ";
        $request2 .= "ville.ville IN ($villeValues) AND";
    }
  
      if (!empty($filters['age'])) {
         $ageConditions = [];
        foreach ($filters['age'] as $ageRange) {
           $ageRange = explode(" ", $ageRange);
            $minAge = $ageRange[0];
            $maxAge = $ageRange[1];
            $ageConditions[] = "(age BETWEEN $minAge AND $maxAge)";
         }
        $ageCondition = implode(" OR ", $ageConditions);
        $request .= "($ageCondition) AND ";
      }

  
      if (!empty($filters['lumi'])) {
          $lumiValues = "'" . implode("', '", $filters['lumi']) . "'";
          $request .= "descr_lum IN ($lumiValues) AND ";
          $request2 .= "acc.lum IN ($lumiValues) AND ";
        }
  
        if (!empty($filters['secu'])) {
          $secuValues = "'" . implode("', '", $filters['secu']) . "'";
          $request .= "descr_dispo_secu IN ($secuValues) AND ";
          $request2 .= "acc.dispo_secu IN ($secuValues) AND ";
        }
  
        if (!empty($filters['surf'])) {
          $surfValues = "'" . implode("', '", $filters['surf']) . "'";
          $request .= "descr_etat_surf IN ($surfValues) AND ";
          $request2 .= "acc.etat_route IN ($surfValues) AND ";
        } 
        
        $request = rtrim($request, " AND ");
        $request .= " LIMIT 100;";

        $request2 =rtrim($request2, "AND" );
        $request2 .="LIMIT 100;";

        $data = trier($request, $db);
        $data2 = trier($request2, $db);
        $response = array('message' => 'Donnees recues avec succes', "ancien_accident" => $data, "nouveau_accident" => $data2);

        echo json_encode($response,JSON_UNESCAPED_UNICODE);
      }
    
 else {
  $request = "SELECT DATE_FORMAT(ac.date, \"%d/%m/%Y %H:%i\") 'date', ac.ville, ac.id_code_insee, ac.latitude, ac.longitude, ac.descr_athmo, ac.descr_lum, ac.descr_etat_surf, ac.an_nais, ac.descr_dispo_secu  FROM ancien_acc ac LIMIT 100;";
  $request2 =  "SELECT *, DATE_FORMAT(ac.horodatage, \"%d/%m/%Y %H:%i\") 'horodatage' from accident ac join  ville on ac.insee = ville.insee ;";
  $data = trier($request, $db);
  $data2 = trier($request2, $db);


  $response = array('message' => 'Aucune donnee postee','ancien_accident' =>$data, 'nouveau_accident' => $data2);
echo json_encode($response,JSON_UNESCAPED_UNICODE);
    }
  

function formatFilterValue($value) {
    // Remplacer '-' par ' '
    $value = str_replace('-', ' ', $value);

    // Remplacer '---' par ' - '
    $value = str_replace('   ', ' - ', $value);
   
    return $value;
  }


function trier($request, $db) {

  $statement = $db->prepare($request);
  $statement->execute();
  $result = $statement->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}


?>
