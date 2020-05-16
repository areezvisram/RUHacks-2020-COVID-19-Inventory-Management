from flask import Flask, redirect, url_for, render_template, request, flash
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

	item_supply = supp.find_one({"path":supply})
	if item_supply:

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

		# print("############")
		# print(stock)
		# print("############")
		# print(needed)
		# print("############")

		data = {
			"stock": stock,
			"needed": needed
		}

		print("#######")
		
		data = json.dumps(data)
		print(data)



		return render_template("map.html", type=supply, data=data, url=os.environ.get("MAP_API_URL")+"&callback=initMap&libraries=visualization")
	else:
		return redirect(url_for("inventory"))


	print(bool(supply))

if __name__ == "__main__":
	print("SERVER START!")
	app.run(debug=True, host="localhost", port=3000)
	print("SERVER CLOSED")