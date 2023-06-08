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
# import repartition_données as rpd
# import kNN_scikit as k_sci


def get_cluster(lat, lon, centroids):
    """
    get nearest cluster from point

    """
    dist = -1
    cluster = 0

    for centroid in enumerate(centroids):
        dist_temp = np.sqrt((lat - centroid[1][1]) ** 2 + (lon - centroid[1][0]) ** 2)
        
        if dist_temp < dist or dist == -1:
            
            dist = dist_temp
            cluster = centroid[0]

    return cluster

def get_json(mode, parameters):
    """
    return json with predicted cluster with kmeans or json with predicted gravity for knn, and classification methods

    """
    if mode == "kmeans":
        try:
            LAT = np.array(np.float_(parameters[0]))
            LON = np.array(np.float_(parameters[1]))
            centroids = parameters[2]

        except IndexError:
            print(
                "Arguments seem to be missing, try running command with args for LAT, LON & centroids\n"
            )
            sys.exit(1)
        point = []

        for element in enumerate(LAT):
            cluster_id = get_cluster(LAT[element[0]], LON[element[0]], centroids)
            point.append({"cluster": cluster_id, "latitude": LAT[element[0]], "longitude":LON[element[0]]})

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

    elif mode == "classification":
        info_acc = parameters
        pred_grav_dict = {"KNN":0, "MLP":0, "SVM":0, "RandomForest":0}
        methode_tab = ["KNN", "MLP", "SVM", "RandomForest"]

        try:
            info_acc[2]
        except IndexError:
            print(
                "Arguments seem to be missing, try running command with args for info_acc & methode\n"  
            )
            sys.exit(1)

        acc = pd.DataFrame(columns=("latitude", "longitude", "descr_cat_veh","descr_lum", "description_intersection","an_nais","descr_type_col"), data=[info_acc])

        for methode in methode_tab:
            
            model = pk.load(open(f"/var/www/etu110/cgi/{methode}.sav", 'rb'))
            if methode == "KNN":
                pred_grav_dict[methode] = model.predict(acc).round()
            else:
                pred_grav_dict[methode] = model.predict(acc.drop(["latitude", "longitude", "an_nais"], axis=1))

            if(pred_grav_dict[methode] == 1): 
                pred_grav_dict[methode] = "Accident grave"
            else:
                pred_grav_dict[methode] = "Accident léger"
        
        return pd.Series(pred_grav_dict).to_json()

    else:
        print(
            f"mode {MODE} inconnu, les modes acceptés sont :\n1. kmeans\n2. knn\n3. classification\n"
        )
        sys.exit(1)
