# RU Hacks 2020 COVID-19 Inventory Management Web
## Inventory management web application for medical supplies in North America
## Designed for RU Hacks 2020
Features:
- Shows detailed table of medical supplies, including total number needed in North America and total in stock in North America
- Each medical supply contains a link to a Map of North America
- Map shows warehouse locations at which medical supply is in stock
- Map also displays heatmap to show which areas in North America are in most desperate need of the medical supply
- Heatmap points can be turned into clickable pins which can show how much of what supply is needed
- Utilizes a mongoDB database to store location data for Google Maps API
- Also includes a COVID-19 self-test where user can answer questions to determine if they should get tested for COVID-19


 ## .env File
 2 environment variables:

1. MONGO_CONNECTION_STRING
	- the full mongodb connection string
2. MAP_API_URL
 	- in the format of: "https://maps.googleapis.com/maps/api/js?key=API_KEY" where API_KEY is your own Google Maps API key
 	- Note: do not add a callback function or libraries in URL

## Usage
To start the server, run the app.py script with python 3.x
```
python app.py
```

By default the server runs on localhost:3000

## Python packages needed
 - flask
 - pymongo
 - python-dotenv
