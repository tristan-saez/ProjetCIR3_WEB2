'use strict';

// effectue une requête AJAX en utilisant la fonction ajaxRequest
function get_pred(id_acc) {
    // Les paramètres de la requête sont "id_acc=" + id_acc, 
    //ce qui signifie qu'il envoie l'identifiant de l'accident dans la chaîne de requête.
    ajaxRequest("POST", 'php/request.php/predGrav', displayGrav, "id_acc=" + id_acc);
}

function displayPredict(data) {

}
// ON appelle displayGrav lorsque la requête AJAX dans get_pred est terminée
function displayGrav(data) {
// Ensuite, on utilise ces données pour construire une URL avec différentes prédictions de gravité (KNN, MLP, SVM, RandomForest) comme paramètres de requête. 
    window.location.replace("prediction.html?KNN=" + JSON.parse(data[2])["KNN"]
    + "&MLP=" + JSON.parse(data[2])["MLP"]
    + "&SVM=" + JSON.parse(data[2])["SVM"]
    + "&RandomForest=" + JSON.parse(data[2])["RandomForest"]);
}