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

            if (isset($_POST['horodatage']) && isset($_POST['latitude']) && isset($_POST['longitude']) &&
            isset($_POST['an_nais_conduct']) && isset($_POST['insee']) && isset($_POST['lum']) &&
            isset($_POST['athmo']) && isset($_POST['route']) && isset($_POST['dispo_secu'])){
                
                //var_dump($_POST['horodatage']);
                $data = dbInsertEvent($db, $_POST['sport'], $_POST['maxPlayers'], $_POST['address'],
                $_POST['city'], $_POST['date'], $_POST['time'], $_POST['price']);
                // var_dump($data);
            }
            else {
                $data = "erreur addAccident request_PHP";
            }

        }
    }

    if ($requestMethod == 'POST') {
        if ($requestRessource == 'listeCity') {
            $data = dbRequestCity($db);           
        }
    }

    if ($requestMethod == 'POST') {
        if ($requestRessource == 'listeLum') {
            $data = dbRequestLum($db);           
        }
    }

    if ($requestMethod == 'POST') {
        if ($requestRessource == 'listeAthmo') {
            $data = dbRequestAthmo($db);  
        }
    }

    if ($requestMethod == 'POST') {
        if ($requestRessource == 'listeRoute') {
            $data = dbRequestRoute($db);  
        }
    }

    if ($requestMethod == 'POST') {
        if ($requestRessource == 'listeDispo_secu') {
            $data = dbRequestDispo_secu($db);  
        }
    }

    /*
    //login request
    if ($requestMethod == 'POST'){
        if ($requestRessource == 'login') {
            if (isset($_POST['email']) && isset($_POST['mdp']))
                // var_dump(password_hash($_POST['mdp'],PASSWORD_DEFAULT));
                $data = dbRequestProfils($db, $_POST['email'], $_POST['mdp']);
                if ($data == "true") {
                    $_SESSION['email'] = $_POST['email'];
                    //var_dump($_SESSION['email']);
                }
        }
    } 

    //gstion session
    if ($requestMethod == 'GET') {
        if ($requestRessource == 'isConnected') {
            if (isset($_SESSION['email'])){
                $data = $_SESSION['email'];
            }else {
                $data = 0;
            }
                       
        }
    }

    //deconnection
    if ($requestMethod == 'GET') {
        if ($requestRessource == 'disconnected') {
            if (isset($_SESSION['email'])){
                session_reset();
                session_abort();
            }else {
                $data = 0;
            }
                       
        }
    }

    if ($requestMethod == 'POST') {
        if ($requestRessource == 'inscription') {
            
            //var_dump($_POST);
            
            if (isset($_POST['email']) && isset($_POST['mdp']) && isset($_POST['nom']) &&
            isset($_POST['prenom']) && isset($_POST['date_de_naissance']) && isset($_POST['ville']) &&
            isset($_POST['forme_physique'])){
                
                //var_dump($_POST['forme_physique']);
                $data = dbInsertProfils($db, $_POST['nom'], $_POST['prenom'], $_POST['date_de_naissance']
                 , $_POST['email'], $_POST['mdp'], $_POST['ville'], $_POST['forme_physique']);
                // $data = "insertplace";
            }
            else {
                $data = "sociss";
            }
                       
        }
    }

    

    if ($requestMethod == 'POST') {
        if ($requestRessource == 'filtre') {
            // $var = "test filtre";
            // var_dump($var);
            // echo "test filtre";
            //var_dump($_POST['sport']);
            $data = dbRequestMatch($db ,$_POST['sport'], $_POST['city'], $_POST['period']);
            // $data = "testfiltre";
        }
    }

    if ($requestMethod == 'POST') {
        if ($requestRessource == 'monoMatch') {
            // var_dump($_POST);
            if (isset($_POST['id'])) {
                $data = dbRequestMatchById($db, $_POST['id']);

                // $data = "sociss";
            }else {
                $data = "bad request !";
            }
            
        }
    }
    if ($requestMethod == 'POST') {
        if ($requestRessource == 'allPlayers') {
            // var_dump($_POST);
            if (isset($_POST['id'])) {
                $data = dbRequestAllPlayerById($db, $_POST['id']);

                // $data = "sociss";
            }else {
                $data = "bad request !";
            }
            
        }
    }
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

    if ($requestMethod == 'POST') {
        if ($requestRessource == 'listeManageMatch') {
            if (isset($_SESSION['email']))
                $data = dbRequestManageMatch($db, $_SESSION['email']);
        }
    }

    if ($requestMethod == 'POST') {
        if ($requestRessource == 'inscriptionMatch') {
            if ($_POST['id_match'])
                $data = dbInsertPlayerMatch($db, $_POST['id_match'], $_SESSION['email']);
        }
    }

    if ($requestMethod == 'POST') {
        if ($requestRessource == 'mesMatchs') {
            $data = dbRequestMesMatch1($db);
        }
    }
    if ($requestMethod == 'POST') {
        if ($requestRessource == 'mesMatchs2') {
            $data = dbRequestMesMatch2($db);
        }
    }
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
        // var_dump($_POST);
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





    // Send data to the client.
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-control: no-store, no-cache, must-revalidate');
    header('Pragma: no-cache');
    header('HTTP/1.1 200 OK');
    echo json_encode($data);
    
    exit;
    */
?>