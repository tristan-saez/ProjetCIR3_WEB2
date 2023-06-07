#!/usr/bin/python3.9

print ("Content-type: application/json \r\n")

import cgi
import cgitb

import json
import os

import get_data as gd

# activation debeug CGI
cgitb.enable()

# recurperation des parametres de l'url envoyés par le formulaire dans la variable form
form = cgi.FieldStorage()

# verification de présence d'une clé dans le tableau form
if 'mode' not in form:
    print('request attribute required !')
    form = 'ERREUR'
    exit()
else:
    # lecture de la valeur de l'attribut dans une variable
    mode = form["mode"].value

    if(mode == "kmeans"):
            lat = form["latitude"].value
            lon = form["longitude"].value
            centroids = form["centroids"].value

            tab_json = gd.get_json(mode, [lat, lon, centroids])
            print(tab_json)
    
    elif(mode == "knn"):
        print("kmeans")

    elif(mode == "classification"):
        print("classification")

