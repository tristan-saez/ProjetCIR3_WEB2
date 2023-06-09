"""
get_data.py functions are used for scripts.sh
It permits to use kmeans, knn and classification python programs.
Sends necessary informations to return prediction of wanted value 
(cluster for kmeans & descr_grav for knn and classification)

all functions except get_cluster return .json file with needed data.

"""

import sys
import pickle as pk
import numpy as np
import pandas as pd
import os

# Elle calcule la distance entre le point donné et chaque centroïde, puis renvoie l'identifiant du cluster le plus proche du point.
def get_cluster(lat, lon, centroids):
    """
    get nearest cluster from point

    """
    dist = -1
    cluster = 0

    for centroid in enumerate(centroids):
        # On calcule la distance euclidienne entre le point donné (défini par les coordonnées lat et lon) et le centroïde actuel. 
        dist_temp = np.sqrt((lat - centroid[1][1]) ** 2 + (lon - centroid[1][0]) ** 2)
        
        #On verifie si cette distance_temp est inferieure à distance ou si c'est la première itération
        if dist_temp < dist or dist == -1:
            
            dist = dist_temp
            cluster = centroid[0]

    return cluster

def get_json(mode, parameters):
    """
    return json with predicted cluster with kmeans or json with predicted gravity for knn, and classification methods

    """
    #Si mode correspond à kmeans on effectue les actions suivantes
    if mode == "kmeans":
        try:
            #extraction des données 
            LAT = np.array(np.float_(parameters[0]))
            LON = np.array(np.float_(parameters[1]))
            centroids = parameters[2]

        except IndexError:
            print(
                "Arguments seem to be missing, try running command with args for LAT, LON & centroids\n"
            )
            sys.exit(1)
        point = []

        #Itération à chaque element LAT
        for element in enumerate(LAT):
            #utilise la fonction get cluster, défini en haut.
            cluster_id = get_cluster(LAT[element[0]], LON[element[0]], centroids)
            point.append({"cluster": cluster_id, "latitude": LAT[element[0]], "longitude":LON[element[0]]})

        #le code concatène les chaînes JSON de tab_json_point et tab_cluster pour former une chaîne JSON complète et la renvoie
        tab_json_point = pd.DataFrame(
            {
                "point": point
            }
        ).to_json()
        tab_cluster = pd.DataFrame(
            {
                "clusters": centroids
            }
        ).to_json()

        tab_json = tab_json_point[:-1] + "," + tab_cluster[1:]

        return tab_json

    #le mode choisi est la classifciation
    elif mode == "classification":
        info_acc = parameters
        pred_grav_dict = {"KNN":0, "MLP":0, "SVM":0, "RandomForest":0}
        methode_tab = ["KNN", "MLP", "SVM", "RandomForest"]
    ## Lorsqu'il  manque un index, il affiche un message d'erreur et arrête l'exécution du script.
        try:
            info_acc[2]
        except IndexError:
            print(
                "Arguments seem to be missing, try running command with args for info_acc & methode\n"  
            )
            sys.exit(1)

        acc = pd.DataFrame(columns=("latitude", "longitude", "descr_cat_veh","descr_lum", "description_intersection","an_nais","descr_type_col"), data=[info_acc])
    # pour chaque méthode de prédiction  le code charge le modèle correspondant depuis un fichier et effectue la prédiction en utilisant le modèle.
        for methode in methode_tab:
            

            model = pk.load(open(f"/var/www/etu110/cgi/{methode}.sav", 'rb'))

            #Si méthode est égale KNN, la valeur de la prédiction est arrondie.
            if methode == "KNN":
                pred_grav_dict[methode] = model.predict(acc).round()
            else:
                pred_grav_dict[methode] = model.predict(acc.drop(["latitude", "longitude", "an_nais"], axis=1))

# le code remplace les valeurs de prédiction par des chaînes de texte correspondantes 
            if(pred_grav_dict[methode] == 1): 
                pred_grav_dict[methode] = "Accident grave"
            else:
                pred_grav_dict[methode] = "Accident léger"
        
        return pd.Series(pred_grav_dict).to_json()

    #Message d'erreur pour mode inconnu
    else:
        print(
            f"mode {MODE} inconnu, les modes acceptés sont :\n1. kmeans\n2. knn\n3. classification\n"
        )
        sys.exit(1)
