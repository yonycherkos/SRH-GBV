from flask import Flask, request, jsonify
from facebook_scraper import get_posts
import pandas as pd
import requests
import json

app = Flask(__name__)

# get specific facebook post data from the given url
def fb_scraper(page_name):
	post_txt = ''.join([post["text"] for post in get_posts(page_name, pages=1)])
	return post_txt

# convert the post data into keyword lists
def text_to_contents(txt):
	f = open("../data/sub_topics.json")
	sub_topics = json.load(f)
	f.close()
	quantieles = [281.0, 674.25]
	contents = {}
	for (sub_topic_name, content_list) in sub_topics.items():
		if sub_topic_name == "content_size":
			if len(txt) <= quantieles[0]:
				contents[sub_topic_name].append("short")
			elif len(txt) >= quantieles[1]:
				contents[sub_topic_name].append("long")
			else:
				contents[sub_topic_name].append("meduim")
		else:
			for content in content_list:
				if content.lower() in str(txt).lower():
					contents[sub_topic_name].append(content)
	return contents

# load iv data
def load_data():
	iv_df= pd.read_csv("../data/iv_data.csv", index_col=0)
	woe_df = pd.read_csv("../data/woe_data.csv", index_col=0)

	iv_data = {}
	iv_data["sub_topic_names"] = list(iv_df.index)
	iv_data["iv"] = list(iv_df["iv"])
	iv_data["iv_interpretation"] = list(iv_df["iv_interpretation"])

	woe_data = {}
	woe_data["contents"] = list(woe_df.index)
	woe_data["sub_topics"] = list(woe_df["sub_topics"])
	woe_data["woe"] = list(woe_df["woe"])

	return (iv_data, woe_data)

# extract iv from the post contents
def extract_iv(contents):
	iv_df= pd.read_csv("../data/iv_data.csv", index_col=0)
	sub_topic_names = list(contents.keys())

	iv_data = {}
	iv_data["sub_topic_names"] = sub_topic_names
	iv_data["iv"] = list(iv_data.loc[sub_topic_names, "iv"])
	iv_data["iv_interpretation"] = list(iv_data.loc[sub_topic_names, "iv_interpretation"])

	return iv_data

# extract woe from the post contents
def extract_woe(contents):
	woe_df = pd.read_csv("../data/woe_data.csv", index_col=0)
	content_list = list(contents.values())

	woe_data = {}
	woe_data["contents"] = list(woe_df.loc[content_list].index)
	woe_data["sub_topics"] = list(woe_df.loc[content_list, "sub_topics"])
	woe_data["woe"] = list(woe_df.loc[content_list, "woe"])

@app.route("/data", methods=['POST'])
def home():
	(iv_data, woe_data) = load_data()
	return jsonify({"iv_data": iv_data, "woe_data": woe_data})

@app.route("/api", methods=['POST'])
def get_visualization_data():
	request_data = request.get_json()
	txt = fb_scraper(request_data['pageName'])

	contents = text_to_contents(txt)
	iv_data = extract_iv(contents)
	woe_data = extract_woe(contents)

	return jsonify({"iv_data": iv_data, "woe_data": woe_data})
