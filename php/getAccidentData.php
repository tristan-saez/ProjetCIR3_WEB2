<?php
// Connexion à votre base de données et exécution de la requête pour récupérer les données des accidents de la route (longitude, latitude)

// Exemple de code pour récupérer les données depuis MySQL
$db = new PDO('mysql:host=localhost;dbname=etu110', 'etu110', 'glxixevu');
$query = "SELECT longitude, latitude FROM ancien_acc";
$statement = $db->query($query);
$data = $statement->fetchAll(PDO::FETCH_ASSOC);

// Envoi des données au format JSON
header('Content-Type: application/json');
echo json_encode($data);
?>
