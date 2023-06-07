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
# import repartition_données as rpd
# import kNN_scikit as k_sci


def get_cluster(lat, lon, centroids):
    """
    get nearest cluster from point

    """
    dist = 100000000000000
    cluster = 0

    for centroid in enumerate(centroids):
        dist_temp = np.sqrt((lat - lon) ** 2 + (centroid[1][0] - centroid[1][1]) ** 2)
        if dist_temp < dist:
            dist = dist_temp
            cluster = centroid[0]

    return cluster

def get_json(mode, parameters):
    """
    return json with predicted cluster with kmeans or json with predicted gravity for knn, and classification methods

    """
    if mode == "kmeans":
        try:
            LAT = float(parameters[0])
            LON = float(parameters[1])
            centroids_input = np.array(np.float_(parameters[2].replace("[", "").replace("]","").split(", "))).reshape(-1, 2)

        except IndexError:
            print(
                "Arguments seem to be missing, try running command with args for LAT, LON & centroids\n"
            )
            sys.exit(1)

        cluster_id = get_cluster(LAT, LON, centroids_input)

        tab_json = pd.DataFrame(
            {
                "point": {"id": None, "lat": LAT, "lon": LON},
                "cluster": {
                    "id": cluster_id,
                    "lat": centroids_input[cluster_id][0],
                    "lon": centroids_input[cluster_id][1],
                },
            }
        ).to_json()

        return tab_json

    # elif mode == "knn":
    #     try:
    #         info_acc = list(parameters[2:9])
    #         CSV = str(parameters[9])
    #     except IndexError:
    #         print(
    #             "Arguments seem to be missing, try running command with args for info_acc & CSV\n"
    #         )
    #         sys.exit(1)

    #     df = pd.read_csv(CSV, sep=",")
    #     acc = pd.DataFrame(columns=df.columns.drop("descr_grav"), data=[info_acc])

    #     X_train, X_test, y_train, y_test = rpd.hold_out(CSV)
    #     test_preds, knn_model = k_sci.kNN_scikit(df, X_train, X_test, y_train, y_test)
    #     predict = knn_model.predict(acc.values).round()

    #     print("Gravite predite : ", predict[0])
    #     pd.Series({"pred_grav": predict[0]}).to_json("pred_grav_KNN.json")


    elif mode == "classification":
        try:
            info_acc = list(parameters[2:6])
            methode = str(parameters[6])
            return [info_acc, methode]
        except IndexError:
            print(
                "Arguments seem to be missing, try running command with args for info_acc & methode\n"
            )
            sys.exit(1)
        # model = pk.load(open(f"{methode}.sav", 'rb'))
        # acc = pd.DataFrame(columns=("descr_cat_veh","descr_lum","description_intersection","descr_type_col"), data=[info_acc])
        # result = model.predict(acc)

        # print("Gravite predite : ", result)
        # return pd.Series({"pred_grav": result[0]}).to_json()

    else:
        print(
            f"mode {MODE} inconnu, les modes acceptés sont :\n1. kmeans\n2. knn\n3. classification\n"
        )
        sys.exit(1)
