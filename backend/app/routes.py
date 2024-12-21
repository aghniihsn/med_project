from flask import request
from app import app
from app.controller import UserController
from app.controller.UserController import registerUser
from app.controller import ReminderController 


@app.route('/')
def index():
    return 'Hello Flask'

@app.route('/register', methods=['POST'])
def register():
    return registerUser()

@app.route('/login', methods = ['POST'])
def logins():
    return UserController.login()

@app.route('/reminder', methods=['GET', 'POST'])
def reminder(): 
    if request.method == 'GET':
        return ReminderController.index()
    else:
        return ReminderController.save()
    
# @app.route('/reminder/<id>', methods=['GET'])
# def reminderDetail(id):
#     return ReminderController.detail(id)