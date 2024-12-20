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

@app.route('/reminder', methods=['GET'])
def reminder():
    return ReminderController.index()