'use strict';

function get_pred(id_acc) {
    ajaxRequest("POST", 'php/request.php/predGrav', displayGrav, "id_acc=" + id_acc);
}

function displayPredict(data) {

}

function displayGrav(data) {
    window.location.replace("prediction.html?KNN=" + JSON.parse(data[2])["KNN"]
    + "&MLP=" + JSON.parse(data[2])["MLP"]
    + "&SVM=" + JSON.parse(data[2])["SVM"]
    + "&RandomForest=" + JSON.parse(data[2])["RandomForest"]);
}