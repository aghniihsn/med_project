from app import app
from app.controller import UserController

@app.route('/')
def index():
    return 'Hello Flask'

@app.route('/login', methods = ['POST'])
def logins():
    return UserController.login()