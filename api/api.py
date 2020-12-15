from flask import Flask

app = Flask(__name__)

# Features to visualize on the scale of 0 to 10
data_points = [
	{ "name": "Likes", "value": 8.7 },
	{ "name": "CVR", "value": 6 },
	{ "name": "CTR", "value": 8 },
	{ "name": "KPI", "value": 7.567 },
	{ "name": "Likes", "value": 8.7 },
	{ "name": "CVR", "value": 6 },
	{ "name": "CTR", "value": 8 },
	{ "name": "KPI", "value": 7.567 },
	# { "name": "Comments", "value": 100 },
];
	

@app.route('/time')
def get_current_time():
    return {
    	'data': data_points
    	}
