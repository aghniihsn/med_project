from flask import jsonify
import requests
from flask_socketio import emit  
from app import socketio 

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
        return response.json()  # Mengembalikan respons dari API
    except requests.exceptions.RequestException as e:
        print(f"Error sending message: {str(e)}")
        return {"error": str(e)}
    
def send_notification_via_websocket(message):  
    print(f"Sending WebSocket notification: {message}")  # Debugging  
    socketio.emit('notification', {'message': message}, broadcast=True)