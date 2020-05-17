from flask import Flask, redirect, url_for, render_template, request, flash, json
from dotenv import load_dotenv
from pymongo import MongoClient
import json
import os

app = Flask(__name__)
load_dotenv()

cluster = MongoClient(os.environ.get("MONGO_CONNECTION_STRING"))
locations = cluster["ru_hacks"]["locations"]
supp = cluster["ru_hacks"]["supplies"]
# print(inv.find_one({"name":"face mask"}))

@app.route("/")
def home():
	print("a")
	return render_template("home.html")

@app.route("/home")
def redirect_home():
	return redirect(url_for("home"))


@app.route("/inventory")
def inventory():
	supplies = list(supp.find({}))
	# print(supplies)
	return render_template("inventory.html", inventory=supplies)

@app.route("/about")
def about():
	return render_template("about.html")

@app.route("/map")
def redirect_map():
	return redirect(url_for("inventory"))

@app.route("/map/<supply>")
def map(supply):

	stock = []
	needed = []

	if (supply == "all"):
		all_locations = list(locations.find({}))

		for location in all_locations:
			if "stock" in location:
				stock.append({
						"location":location["location"],
						"stock":location["stock"]
						})
			if "needed" in location:
				needed.append({
						"location":location["location"],
						"needed":location["needed"]
						})

		data = {
			"stock": stock,
			"needed": needed
		}
		
		data = json.dumps(data)
		map_style = json.load(open("static/map_style.json"))


		return render_template("map.html", type="all", data=data, style=map_style, url=os.environ.get("MAP_API_URL")+"&callback=initMap&libraries=visualization")


	item_supply = supp.find_one({"path":supply})
	if item_supply:

		all_locations = list(locations.find({}))

		for location in all_locations:
			if "stock" in location:
				if bool(list(filter(lambda item: item["name"] == item_supply["name"] , location["stock"]))):
					stock.append({
						"location":location["location"],
						"stock":location["stock"]
						})
			if "needed" in location:
				if bool(list(filter(lambda item: item["name"] == item_supply["name"] , location["needed"]))):
					needed.append({
						"location":location["location"],
						"needed":location["needed"]
						})

		data = {
			"stock": stock,
			"needed": needed
		}
		data = json.dumps(data)
		map_style = json.load(open("static/map_style.json"))


		return render_template("map.html", type=item_supply["name"], data=data, style=map_style, url=os.environ.get("MAP_API_URL")+"&callback=initMap&libraries=visualization")
	else:
		return redirect(url_for("inventory"))


	print(bool(supply))

if __name__ == "__main__":
	print("SERVER START!")
	app.run(debug=True, host="localhost", port=3000)
	print("SERVER CLOSED")