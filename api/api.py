from flask import Flask, request, jsonify
from facebook_scraper import get_posts
import pandas as pd
import requests
import json

app = Flask(__name__)


def text_to_contents(txt):
    f = open("../data/sub_topics.json")
    sub_topics = json.load(f)
    f.close()
    lower_meduim = 350
    upper_meduim = 600
    contents = {}
    for (sub_topic_name, content_list) in sub_topics.items():
        contents[sub_topic_name] = []
        if sub_topic_name == "content_size":
            if len(txt) <= lower_meduim:
                contents[sub_topic_name].append("short")
            elif len(txt) >= upper_meduim:
                contents[sub_topic_name].append("long")
            else:
                contents[sub_topic_name].append("meduim")
        else:
            for content in content_list:
                if content.lower() in str(txt).lower():
                    contents[sub_topic_name].append(content)

        if len(contents[sub_topic_name]) == 0:
            del contents[sub_topic_name]

    return contents


def load_data():
    iv_df = pd.read_csv("../data/iv_data.csv", index_col=0)
    woe_df = pd.read_csv("../data/woe_data.csv", index_col=0)

    iv_data = []
    sub_topic_names = list(iv_df.index)
    ivs = list(iv_df["iv"])
    iv_interpretations = list(iv_df["iv_interpretation"])
    for (sub_topic_name, iv, iv_interpretation) in zip(sub_topic_names, ivs, iv_interpretations):
        iv_data.append({"sub_topic_name": sub_topic_name,
                        "iv": iv, "iv_interpretation": iv_interpretation})

    woe_data = []
    for sub_topic_name in woe_df["sub_topics"].unique():
        contents = []
        content_list = list(
            woe_df[woe_df["sub_topics"] == sub_topic_name].index)
        woes = list(woe_df[woe_df["sub_topics"] == sub_topic_name]["woe"])
        for (content, woe) in zip(content_list, woes):
            contents.append({"content": content, "woe": woe})
        woe_data.append(
            {"sub_topic_name": sub_topic_name, "contents": contents})

    woe_extreme_data = []
    for sub_topic_name in woe_df["sub_topics"].unique():
        woe_extreme_data.append({"sub_topic_name": sub_topic_name,
                                 "min_woe": woe_df[woe_df["sub_topics"] == sub_topic_name]["woe"].min(),
                                 "max_woe": woe_df[woe_df["sub_topics"] == sub_topic_name]["woe"].max()
                                 })

    return (iv_data, woe_data, woe_extreme_data)


def extract_iv(contents):
    iv_df = pd.read_csv("../data/iv_data.csv", index_col=0)

    iv_data = []
    sub_topic_names = list(contents.keys())
    ivs = list(iv_df.loc[sub_topic_names, "iv"])
    iv_interpretations = list(iv_df.loc[sub_topic_names, "iv_interpretation"])
    for (sub_topic_name, iv, iv_interpretation) in zip(sub_topic_names, ivs, iv_interpretations):
        iv_data.append({"sub_topic_name": sub_topic_name,
                        "iv": iv, "iv_interpretation": iv_interpretation})

    return iv_data


def extract_woe(contents):
    woe_df = pd.read_csv("../data/woe_data.csv", index_col=0)
    content_list = []
    for content in contents.values():
        for c in content:
            content_list.append(c)

    woe_data = []
    sub_topic_names = list(woe_df.loc[content_list, "sub_topics"])
    woes = list(woe_df.loc[content_list, "woe"])
    for (content, sub_topic_name, woe) in zip(content_list, sub_topic_names, woes):
        woe_data.append(
            {"content": content, "sub_topic_name": sub_topic_name, "woe": woe})

    return woe_data


def extract_woe_extreme(contents):
    woe_df = pd.read_csv("../data/woe_data.csv", index_col=0)
    content_list = []
    for content in contents.values():
        for c in content:
            content_list.append(c)

    woe_extreme_data = []
    sub_topic_names = list(woe_df.loc[content_list, "sub_topics"].unique())
    for sub_topic_name in sub_topic_names:
        woe_extreme_data.append({"sub_topic_name": sub_topic_name,
                                 "min_woe": woe_df[woe_df["sub_topics"] == sub_topic_name]["woe"].min(),
                                 "max_woe": woe_df[woe_df["sub_topics"] == sub_topic_name]["woe"].max()
                                 })
    return woe_extreme_data


@app.route("/data")
def home():
    (iv_data, woe_data, woe_extreme_data) = load_data()
    return jsonify({"iv_data": iv_data, "woe_data": woe_data, "woe_extreme_data": woe_extreme_data})


@app.route("/api", methods=['POST'])
def get_visualization_data():
    request_data = request.get_json()
    contents = text_to_contents(request_data["postData"])
    iv_data = extract_iv(contents)
    woe_data = extract_woe(contents)

    return jsonify({"iv_data": iv_data, "woe_data": woe_data})
