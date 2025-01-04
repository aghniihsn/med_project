from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

def send_message():
    data = request.json
    url = "https://dash.pushwa.com/api/kirimPesan"

    payload = {
        "token": data.get("token"),
        "target": data.get("target"),
        "type": data.get("type", "text"),
        "delay": data.get("delay", "1"),
        "message": data.get("message"),
    }

    headers = {
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status() 
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500