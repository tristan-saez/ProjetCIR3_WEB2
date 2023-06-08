'use strict';

let KNN = window.location.href.split("=")[1].split("&")[0];
let MLP = window.location.href.split("=")[2].split("&")[0];
let SVM = window.location.href.split("=")[3].split("&")[0];
let RandomForest = window.location.href.split("=")[4].split("&")[0];

$("#KNN").html(decodeURI(KNN));
$("#MLP").html(decodeURI(MLP));
$("#SVM").html(decodeURI(SVM));
$("#RandomForest").html(decodeURI(RandomForest));
