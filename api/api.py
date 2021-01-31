from flask import Flask, request, jsonify
from facebook_scraper import get_posts
import pandas as pd
import requests
import json

app = Flask(__name__)

# get specific facebook post data from the given url
def fb_scraper(page_name):
	post_txt = ''.join([post['text'] for post in get_posts(page_name, pages=1)])
	return post_txt

# convert the post data into keyword lists
def text_to_keywords(txt):
	f = open('../data/keywords.json')
	keywords = json.load(f)
	keyword_list = []
	for list_ in keywords.values():
		keyword_list.extend(list_)

	keywords = list(set([str(keyword) for keyword in keyword_list if (keyword.lower() in str(txt).lower())]))
	return keywords

# extract associated woe and iv
def keywords_to_woe_and_iv(keywords):
	woe_iv_data = pd.read_csv('../data/woe_iv_data.csv', index_col='keyword')
	woe = list(woe_iv_data.loc[keywords]['woe'])
	iv = list(woe_iv_data.loc[keywords]['iv'])
	return (woe, iv)

@app.route('/api', methods=['POST'])
def get_visualization_data():
	request_data = request.get_json()
	txt = fb_scraper(request_data['pageName'])
	keywords = text_to_keywords(txt)
	(woe_, iv_) = keywords_to_woe_and_iv(keywords)

	data = []
	for (keyword, woe, iv) in zip(keywords, woe_, iv_):
		data.append({'keyword': keyword, 'woe': woe, 'iv': iv})
	return jsonify({'data': data})
