<?php
    // Check the request.
    require_once('database.php');
    session_start();

    // Database connexion.
    $db = dbConnect();
    if (!$db)
    {
      header ('HTTP/1.1 503 Service Unavailable');
      exit;
    }
    
    //get request done and modify it for use
    $requestMethod = $_SERVER['REQUEST_METHOD'];
    $request = substr($_SERVER['PATH_INFO'], 1);
    $request = explode('/', $request);
    $requestRessource = array_shift($request);

    //change city GET to be usable on filtering (lower characters & add %)
    $city = strtolower($_GET['city'])."%";

    //request data (select the cities that matches typed char)
    $request_sql = "SELECT ville, insee FROM ville WHERE LOWER(ville) LIKE :city ORDER BY CHAR_LENGTH(ville) ASC";
    $query = $db->prepare($request_sql);
    $query->execute(array(
        ':city' => $city
    ));
    $data = $query->fetchAll();

    // Send data to the client.
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-control: no-store, no-cache, must-revalidate');
    header('Pragma: no-cache');
    header('HTTP/1.1 200 OK');
    echo json_encode($data);
    exit;
?>