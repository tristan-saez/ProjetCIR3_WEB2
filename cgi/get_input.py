#!/usr/bin/python3.9

print ("Content-type: application/json \r\n")

import cgi
import cgitb

import json
import os
import numpy as np

import get_data as gd

# activation debeug CGI
cgitb.enable()

# recurperation des parametres de l'url envoyés par le formulaire dans la variable form
form = cgi.FieldStorage()

# verification de présence d'une clé dans le tableau form
if 'arguments' not in form:
    form = 'ERREUR'
    exit()
else:
    # lecture de la valeur de l'attribut dans une variable
    mode = form["arguments"].value.split(",")[0]

    if(mode == "kmeans"):
            lat = form["arguments"].value.split(",")[1].split("_")
            lon = form["arguments"].value.split(",")[2].split("_")
            centroids = [[0.628019,48.82026],
                    [-60.73254679,14.81604711],
                    [55.38989084,-21.04071756],
                    [6.46508658,43.11240822],
                    [0.2278613,43.66246711],
                    [6.61769178,48.53448235],
                    [-0.35396014,45.80864297],
                    [-2.17550417,48.15034306],
                    [2.52760383,48.58484214],
                    [3.63592553,43.67258776],
                    [4.71464448,45.89264986],
                    [2.82381573,50.43920805]]

            tab_json = gd.get_json(mode, [lat, lon, centroids])
            print(tab_json)
    
    elif(mode == "knn"):
        print("knn")

    elif(mode == "classification"):
        result = form["arguments"].value.split(",")[1].split("_")

        cat_veh = result[0]
        lum = result[1]
        inter = result[2]
        type_col = result[3]
        an_naiss = result[4]
        latitude = result[5]
        longitude = result[6]

        tab_json = gd.get_json(mode, [latitude, longitude, cat_veh, lum, inter, an_naiss,  type_col])
        print(tab_json)
        

