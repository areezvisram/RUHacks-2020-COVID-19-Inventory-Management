from pymongo import MongoClient
from dotenv import load_dotenv
import os
import random
import json

load_dotenv()

cluster = MongoClient(os.environ.get("MONGO_CONNECTION_STRING"))
locations = cluster["ru_hacks"]["locations"]
supplies = cluster["ru_hacks"]["supplies"]

supplies_list = [
	"face mask",
	"gloves",
	"disinfectant",
	"gowns",
	"head covers",
	"respirator",
	"shoe covers",
	"hand sanitizer",
	"ventilators",
	"thermometers",
	"testing kits",
	"flock swabs"
]


def add_supplies(data):
	if not supplies.find_one({"name": data["name"]}):
		print("added to db")
		supplies.insert_one(data)
	else:
		print("already in db")

def add_locations(data):
	stock = []
	needed = []
	if "stock" in data:
		stock = list(filter(lambda item: bool(supplies.find_one({"name": item["name"]})), data["stock"]))
		if stock:
			print("in stock")
			locations.insert_one(data)
			for item in data["stock"]:
				supplies.find_one_and_update({"name": item["name"]}, {"$inc": {"stock": item["amount"]}})
		else:
			print("not in stock")
	if "needed" in data:
		needed = list(filter(lambda item: bool(supplies.find_one({"name": item["name"]})), data["needed"]))
		if needed:
			print("needed")
			locations.insert_one(data)
			for item in data["needed"]:
				supplies.find_one_and_update({"name": item["name"]}, {"$inc": {"needed": item["amount"]}})
		else:
			print("not needed")


def populate_map():

	data = None

	with open('static/csvjson.json') as f:
	# with open('static/ca.json') as f:
  		data = json.load(f)

		
	for place in data:
		print(place["city"])
		# num_points = random.randint(1, 4)
		num_points = 1

		for i in range(num_points):
			if random.randint(0,20) == 0:
				item = random.choice(supplies_list)
				amount = random.randint(50, 1000)
				# weight = random.randint(1, 10)
				weight = 1
				lat_noise = random.random() * (-1 if random.randint(0,1) else 1) * 2.5
				long_noise = random.random() * (-1 if random.randint(0,1) else 1) * 2.5

				data = {
					"location": {
						"lat": float(place["lat"]) + lat_noise,
						"long": float(place["lng"]) + long_noise,
						"address": ""
					},
					"weight": weight,
					"needed": [
						{
							"name": item,
							"amount": amount
						}
					]		
				}

				add_locations(data)



supply_data = {
	"name": "flock swabs",
	"path": "flock_swabs",
	"stock": 0,
	"needed": 0
}

locations_data = {
	"location": {
		"lat": 0,
		"long": 0,
		"address": ""
	},
	# "stock": [
	# 	{
	# 		"name": "face mask",
	# 		"amount": 70
	# 	}
	# ],
	"needed": [
		{
			"name": "face mask",
			"amount": 10
		}
	]
}

# add_locations(locations_data)
# add_supplies(supply_data)
populate_map()