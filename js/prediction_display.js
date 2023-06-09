'use strict';
// Extraction des valeurs des paramètres de requête d'une URL, puis les utilise pour mettre à jour le contenu des éléments HTML spécifiés.
// Cela permet d'afficher les valeurs extraites dans les éléments HTML correspondants sur la page web.
let KNN = window.location.href.split("=")[1].split("&")[0];
let MLP = window.location.href.split("=")[2].split("&")[0];
let SVM = window.location.href.split("=")[3].split("&")[0];
let RandomForest = window.location.href.split("=")[4].split("&")[0];

// utilise la méthode html() pour modifier son contenu en utilisant la valeur 
// decodeURI() est utilisé pour décoder les caractères spéciaux qui pourraient être présents dans la valeur.
$("#KNN").html(decodeURI(KNN));
$("#MLP").html(decodeURI(MLP));
$("#SVM").html(decodeURI(SVM));
$("#RandomForest").html(decodeURI(RandomForest));
