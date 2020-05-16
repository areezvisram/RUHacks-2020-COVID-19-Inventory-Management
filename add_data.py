from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

cluster = MongoClient(os.environ.get("MONGO_CONNECTION_STRING"))
locations = cluster["ru_hacks"]["locations"]
supplies = cluster["ru_hacks"]["supplies"]

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


supply_data = {
	"name": "",
	"path": "",
	"stock": 0,
	"needed": 0
}

locations_data = {
	"location": {
		"lat": 0,
		"long": 0,
		"address": ""
	},
	"stock": [
		{
			"name": "face mask",
			"amount": 70
		}
	],
	# "needed": [
	# 	{
	# 		"name": "face mask",
	# 		"amount": 10
	# 	}
	# ]
}

add_locations(locations_data)
# add_supplies(supply_data)