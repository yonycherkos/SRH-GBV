from flask import Flask, request, jsonify
from facebook_scraper import get_posts
import pandas as pd
import requests
import json

app = Flask(__name__)


def extract_home_data():
    SRH_iv_df = pd.read_csv("../data/SRH_iv_data.csv", index_col=0)
    GVB_iv_df = pd.read_csv("../data/GBV_iv_data.csv", index_col=0)

    SRH_iv_data = []
    features = list(SRH_iv_df.index)
    ivs = list(SRH_iv_df["iv"])
    iv_interpretations = list(SRH_iv_df["iv_interpretation"])
    for (feature, iv, iv_interpretation) in zip(features, ivs, iv_interpretations):
        SRH_iv_data.append({"feature": feature,
                            "iv": iv,
                            "iv_interpretation": iv_interpretation})

    GVB_iv_data = []
    features = list(GVB_iv_df.index)
    ivs = list(GVB_iv_df["iv"])
    iv_interpretations = list(GVB_iv_df["iv_interpretation"])
    for (feature, iv, iv_interpretation) in zip(features, ivs, iv_interpretations):
        GVB_iv_data.append({"feature": feature,
                            "iv": iv,
                            "iv_interpretation": iv_interpretation})

    return (SRH_iv_data, GVB_iv_data)


def extract_SRH_data():
    SRH_iv_df = pd.read_csv("../data/SRH_iv_data.csv", index_col=0)
    SRH_woe_df = pd.read_csv("../data/SRH_woe_data.csv", index_col=0)

    SRH_iv_data = []
    features = list(SRH_iv_df.index)
    ivs = list(SRH_iv_df["iv"])
    iv_interpretations = list(SRH_iv_df["iv_interpretation"])
    for (feature, iv, iv_interpretation) in zip(features, ivs, iv_interpretations):
        SRH_iv_data.append({"feature": feature,
                            "iv": iv,
                            "iv_interpretation": iv_interpretation})

    SRH_woe_data = []
    for feature in SRH_woe_df["features"].unique():
        contents = []
        content_list = list(
            SRH_woe_df[SRH_woe_df["features"] == feature].index)
        woes = list(SRH_woe_df[SRH_woe_df["features"] == feature]["woe"])
        for (content, woe) in zip(content_list, woes):
            contents.append({"content": content, "woe": woe})
        SRH_woe_data.append(
            {"feature": feature, "contents": contents})

    SRH_woe_extreme_data = []
    for feature in SRH_woe_df["features"].unique():
        SRH_woe_extreme_data.append({"feature": feature,
                                     "min_woe": SRH_woe_df[SRH_woe_df["features"] == feature]["woe"].min(),
                                     "max_woe": SRH_woe_df[SRH_woe_df["features"] == feature]["woe"].max()
                                     })

    return (SRH_iv_data, SRH_woe_data, SRH_woe_extreme_data)


def extract_GBV_data():
    GBV_iv_df = pd.read_csv("../data/GBV_iv_data.csv", index_col=0)
    GBV_woe_df = pd.read_csv("../data/GBV_woe_data.csv", index_col=0)

    GBV_iv_data = []
    features = list(GBV_iv_df.index)
    ivs = list(GBV_iv_df["iv"])
    iv_interpretations = list(GBV_iv_df["iv_interpretation"])
    for (feature, iv, iv_interpretation) in zip(features, ivs, iv_interpretations):
        GBV_iv_data.append({"feature": feature,
                            "iv": iv,
                            "iv_interpretation": iv_interpretation})

    GBV_woe_data = []
    for feature in GBV_woe_df["features"].unique():
        contents = []
        content_list = list(
            GBV_woe_df[GBV_woe_df["features"] == feature].index)
        woes = list(GBV_woe_df[GBV_woe_df["features"] == feature]["woe"])
        for (content, woe) in zip(content_list, woes):
            contents.append({"content": content, "woe": woe})
        GBV_woe_data.append(
            {"feature": feature, "contents": contents})

    GBV_woe_extreme_data = []
    for feature in GBV_woe_df["features"].unique():
        GBV_woe_extreme_data.append({"feature": feature,
                                     "min_woe": GBV_woe_df[GBV_woe_df["features"] == feature]["woe"].min(),
                                     "max_woe": GBV_woe_df[GBV_woe_df["features"] == feature]["woe"].max()
                                     })

    return (GBV_iv_data, GBV_woe_data, GBV_woe_extreme_data)


def find_content_size(txt):
    lower_meduim = 350
    upper_meduim = 600
    if len(txt) <= lower_meduim:
        content_size = "short"
    elif len(txt) >= upper_meduim:
        content_size = "long"
    else:
        content_size = "medium"
    return content_size


def find_content_topic(txt):
    contain_SRH = False
    with open("../data/SRH_sub_topics.json") as f:
        SRH_sub_topics = json.load(f)
        for sub_topic in list(SRH_sub_topics.values())[0]:
            if sub_topic.lower() in txt.lower():
                contain_SRH = True
                break

    contain_GBV = False
    with open("../data/GBV_sub_topics.json") as f:
        GBV_sub_topics = json.load(f)
        for sub_topic in list(GBV_sub_topics.values())[0]:
            if sub_topic.lower() in txt.lower():
                contain_GBV = True
                break

    topic = None
    if (contain_SRH and contain_GBV):
        topic = "both"
    elif contain_SRH:
        topic = "SRH"
    elif contain_GBV:
        topic = "GBV"

    return topic


def extract_SRH_post_data(contents):
    SRH_iv_df = pd.read_csv("../data/SRH_iv_data.csv", index_col=0)
    SRH_woe_df = pd.read_csv("../data/SRH_woe_data.csv", index_col=0)

    SRH_iv_data = []
    features = list(SRH_iv_df.index)
    ivs = list(SRH_iv_df["iv"])
    iv_interpretations = list(SRH_iv_df["iv_interpretation"])
    for (feature, iv, iv_interpretation) in zip(features, ivs, iv_interpretations):
        SRH_iv_data.append({"feature": feature,
                            "iv": iv,
                            "iv_interpretation": iv_interpretation})

    SRH_woe_data = []
    content_list = list(contents.values())
    features = list(SRH_woe_df.loc[content_list, "features"])
    woes = list(SRH_woe_df.loc[content_list, "woe"])
    for (content, feature, woe) in zip(content_list, features, woes):
        SRH_woe_data.append(
            {"content": content, "feature": feature, "woe": woe})

    return (SRH_iv_data, SRH_woe_data)


def extract_GBV_post_data(contents):
    GBV_iv_df = pd.read_csv("../data/GBV_iv_data.csv", index_col=0)
    GBV_woe_df = pd.read_csv("../data/GBV_woe_data.csv", index_col=0)

    GBV_iv_data = []
    features = list(GBV_iv_df.index)
    ivs = list(GBV_iv_df["iv"])
    iv_interpretations = list(GBV_iv_df["iv_interpretation"])
    for (feature, iv, iv_interpretation) in zip(features, ivs, iv_interpretations):
        GBV_iv_data.append({"feature": feature,
                            "iv": iv,
                            "iv_interpretation": iv_interpretation})

    GBV_woe_data = []
    content_list = list(contents.values())
    features = list(GBV_woe_df.loc[content_list, "features"])
    woes = list(GBV_woe_df.loc[content_list, "woe"])
    for (content, feature, woe) in zip(content_list, features, woes):
        GBV_woe_data.append(
            {"content": content, "feature": feature, "woe": woe})

    return (GBV_iv_data, GBV_woe_data)


@app.route("/home")
def load_home_data():
    (SRH_iv_data, GBV_iv_data) = extract_home_data()
    return jsonify({"SRH_iv_data": SRH_iv_data, "GBV_iv_data": GBV_iv_data})


@app.route("/SRH")
def load_SRH_data():
    (SRH_iv_data, SRH_woe_data, SRH_woe_extreme_data) = extract_SRH_data()
    return jsonify({"SRH_iv_data": SRH_iv_data, "SRH_woe_data": SRH_woe_data, "SRH_woe_extreme_data": SRH_woe_extreme_data})


@app.route("/GBV")
def load_GBV_data():
    (GBV_iv_data, GBV_woe_data, GBV_woe_extreme_data) = extract_GBV_data()
    return jsonify({"GBV_iv_data": GBV_iv_data, "GBV_woe_data": GBV_woe_data, "GBV_woe_extreme_data": GBV_woe_extreme_data})


@app.route("/post", methods=['POST'])
def load_post_data():
    request_data = request.get_json()
    contents = {"content_size": find_content_size(request_data["text"]),
                "image": request_data["image"],
                "link": request_data["link"],
                "language": request_data["language"],
                "time": request_data["time"]}

    topic = find_content_topic(request_data["text"])
    if topic == "both":
        (SRH_iv_data, SRH_woe_data) = extract_SRH_post_data(contents)
        (GBV_iv_data, GBV_woe_data) = extract_GBV_post_data(contents)
        return jsonify({"SRH_iv_data": SRH_iv_data, "SRH_woe_data": SRH_woe_data,
                        "GBV_iv_data": GBV_iv_data, "GBV_woe_data": GBV_woe_data, })
    elif topic == "SRH":
        (SRH_iv_data, SRH_woe_data) = extract_SRH_post_data(contents)
        return jsonify({"SRH_iv_data": SRH_iv_data, "SRH_woe_data": SRH_woe_data,
                        "GBV_iv_data": None, "GBV_woe_data": None, })
    elif topic == "GBV":
        (SRH_iv_data, SRH_woe_data) = extract_GBV_post_data(contents)
        return jsonify({"SRH_iv_data": SRH_iv_data, "SRH_woe_data": SRH_woe_data,
                        "GBV_iv_data": None, "GBV_woe_data": None, })
    return jsonify({"SRH_iv_data": None, "SRH_woe_data": None,
                    "GBV_iv_data": None, "GBV_woe_data": None, })
