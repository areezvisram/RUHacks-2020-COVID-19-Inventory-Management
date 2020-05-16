from flask import Flask, redirect, url_for, render_template, request, flash
from pymongo import MongoClient

app = Flask(__name__)

if __name__ == "__main__":
	print("SERVER START!")
	app.run(debug=False, host="localhost", port=80)
	print("SERVER CLOSED")