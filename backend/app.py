from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# MongoDB Configuration
app.config["MONGO_URI"] = os.environ.get("MONGO_URI", "mongodb://mongodb:27017/fullstack-app")
mongo = PyMongo(app)

# Get items collection
items = mongo.db.items

@app.route("/api/items", methods=["GET"])
def get_items():
    all_items = []
    for item in items.find().sort("date", -1):
        item["_id"] = str(item["_id"])  # Convert ObjectId to string
        all_items.append(item)
    return jsonify(all_items)

@app.route("/", methods=["GET"])
def index():
    return jsonify({"message": "Flask backend is running"})

@app.route("/api/items", methods=["POST"])
def add_item():
    text = request.json.get("text", "")
    if not text:
        return jsonify({"error": "Text is required"}), 400
    
    item_id = items.insert_one({
        "text": text,
        "date": datetime.utcnow()
    }).inserted_id
    
    new_item = items.find_one({"_id": item_id})
    new_item["_id"] = str(new_item["_id"])
    
    return jsonify(new_item)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)