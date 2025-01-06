from flask import jsonify
import requests

def send_message(token, target, message):
    print(f"Sending message to {target}: {message}")  # Debugging
    url = "https://dash.pushwa.com/api/kirimPesan"
    payload = {
        "token": token,
        "target": target,
        "type": "text",
        "delay": "1",
        "message": message,
    }
    headers = {
        "Content-Type": "application/json"
    }
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        return response.json() 
    except requests.exceptions.RequestException as e:
        print(f"Error sending message: {str(e)}")
        return {"error": str(e)}
