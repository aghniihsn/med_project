from flask import request, Blueprint
from app import socketio
from app.controller import UserController
from app.controller.UserController import registerUser
from app.controller import ReminderController 
from app.controller import NotifController
from flask import jsonify

main = Blueprint("main", __name__)

@main.route('/')
def index():
    return 'Hello Flask'

@main.route('/register', methods=['POST'])
def register():
    return registerUser()

@main.route('/login', methods = ['POST'])
def logins():
    return UserController.login(socketio)

@main.route("/notification/<id>", methods=['GET'])
def getAllNotification(id):
    return NotifController.getAll(id)

@main.route('/allUser', methods=['GET'])
def getAllUser():
    return UserController.getAllUsers()

@main.route('/user-by-token', methods = ['POST'])
def userByToken():
    return UserController.getUserbyToken()

@main.route('/reminder', methods=['GET', 'POST'])
def reminder(): 
    if request.method == 'GET':
        return ReminderController.show()
    else:
        return ReminderController.save()

@main.route('/history/<id>', methods=['GET'])
def history(id):
    return ReminderController.history(id)
    
@main.route('/reminder/<id>', methods=['GET', 'PUT', 'DELETE'])
def reminderDetail(id):
    if request.method == 'GET':
        return ReminderController.detail(id)
    elif request.method == 'PUT':
        return ReminderController.ubah(id)
    elif request.method == 'DELETE' :
        return ReminderController.hapus(id)
    
@main.route('/send_message', methods=['POST'])
def send_message():
    return NotifController.send_message()

@main.route('/send_notification', methods=['POST'])  
def send_notification():  
    data = request.json  
    message = data.get('message')  
    NotifController.send_notification_via_websocket(message)  
    return jsonify({"status": "success", "message": "Notification sent via WebSocket"})   