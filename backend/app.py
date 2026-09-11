from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)


DATA_FILE = "data/profiles.json"


@app.route("/")
def home():
    return "CareerMirror Backend is Running!"


@app.route("/api/profile", methods=["POST"])
def save_profile():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No profile data received"
        }), 400

    user_id = data.get("user_id")

    if not user_id:
        return jsonify({
            "error": "User ID is required"
        }), 400

    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as file:
            profiles = json.load(file)
    else:
        profiles = []

    # Check if user already has a profile
    existing_profile = False

    for i, profile in enumerate(profiles):

        if profile.get("user_id") == user_id:

            profiles[i] = data
            existing_profile = True
            break

    # If user doesn't exist, create new profile
    if not existing_profile:
        profiles.append(data)

    with open(DATA_FILE, "w") as file:
        json.dump(profiles, file, indent=4)

    return jsonify({
        "message": "Profile saved successfully",
        "profile": data
    }), 200


@app.route("/api/profile/<user_id>", methods=["GET"])
def get_profile(user_id):

    # Check if the profiles file exists
    if not os.path.exists(DATA_FILE):
        return jsonify({
            "error": "No profiles found"
        }), 404

    # Read profiles from JSON file
    with open(DATA_FILE, "r") as file:
        profiles = json.load(file)

    # Search for the requested user
    for profile in profiles:
        if profile.get("user_id") == user_id:
            return jsonify(profile), 200

    # User was not found
    return jsonify({
        "error": "Profile not found"
    }), 404


if __name__ == "__main__":
    app.run(debug=True)