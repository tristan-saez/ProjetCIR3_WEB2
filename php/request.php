<?php
    require_once('database.php');

    session_start();

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

    if ($requestMethod == "POST") {
        if ($requestRessource == "addAccident") {

            if (isset($_POST['horodatage']) &&
            isset($_POST['an_nais_conduct']) && isset($_POST['insee']) && isset($_POST['lum']) &&
            isset($_POST['athmo']) && isset($_POST['etat_route']) && isset($_POST['dispo_secu']) && 
            isset($_POST['descr_cat_veh']) && isset($_POST['descr_inter']) && isset($_POST['descr_type_col'])){
                
                $data = dbInsertAccident($db, $_POST['horodatage'], 
                $_POST['an_nais_conduct'], $_POST['insee'], $_POST['lum'], $_POST['athmo'], $_POST['etat_route'],
                $_POST['dispo_secu'], $_POST['descr_cat_veh'], $_POST['descr_inter'], $_POST['descr_type_col']);
            }
            else {
                $data = "request";
            }
        }
    }

    if ($requestMethod == 'POST') {
        if ($requestRessource == 'listCity') {
            $data = dbRequestCity($db);           
        }
    }

    if ($requestMethod == 'POST') {
        if ($requestRessource == 'listLum') {
            $data = dbRequestLum($db);           
        }
    }

    if ($requestMethod == 'POST') {
        if ($requestRessource == 'listAthmo') {
            $data = dbRequestAthmo($db);  
        }
    }

    if ($requestMethod == 'POST') {
        if ($requestRessource == 'listRoute') {
            $data = dbRequestRoute($db);  
        }
    }

    if ($requestMethod == 'POST') {
        if ($requestRessource == 'listDispo_secu') {
            $data = dbRequestDispo_secu($db);  
        }
    }

    if ($requestMethod == 'POST') {
        if ($requestRessource == 'listCat_veh') {
            $data = dbRequestCat_veh($db);  
        }
    }

    if ($requestMethod == 'POST') {
        if ($requestRessource == 'listInter') {
            $data = dbRequestInter($db);  
        }
    }

    if ($requestMethod == 'POST') {
        if ($requestRessource == 'listType_col') {
            $data = dbRequestType_col($db);  
        }
    }

    if($requestMethod=='POST'){
        if($requestRessource =='ancien_acc'){
            $data = dbRequestAncienAcc($db);
        }
    }

     if($requestMethod =='POST'){
         if($requestRessource== 'accident'){
             $data = dbRequestAccident($db);
         }
     }

    if($requestMethod=='POST'){
        if($requestRessource =='ancien_acc_bis'){
            $data = dbRequestAncienAcc($db);
        }
    }

    if ($requestMethod == 'POST') {
        if ($requestRessource == 'predCluster') {
            $data = dbRequestCluster($db);           
        }
    }

    if ($requestMethod == 'POST') {
        if ($requestRessource == 'predGrav') {
            if (isset($_POST['id_acc'])) {
                $data = dbRequestGrav($db, $_POST['id_acc']);   
            } else {
                $data="request";
            }
        }
    }

    if($requestMethod == 'POST'){
        if($requestRessource == 'listSecu'){
            $data = dbRequestDispo_secu($db);
        }
    }
    
    if($requestMethod == 'POST'){
        if($requestMethod == 'listSurf'){
        $data =dbRequestRoute($db);
        }
    }

    // Send data to the client.
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-control: no-store, no-cache, must-revalidate');
    header('Pragma: no-cache');
    header('HTTP/1.1 200 OK');
    echo json_encode($data);
    
    exit;

?>