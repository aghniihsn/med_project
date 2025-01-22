from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
import threading
import schedule
import time
from flask_socketio import SocketIO

load_dotenv()

jwt = JWTManager()
db = SQLAlchemy()
migrate = Migrate()
socketio = SocketIO(cors_allowed_origins="*") 

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    jwt.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    socketio.init_app(app)

    from app.routes import main

    app.register_blueprint(main)

    from app.model import user, medicine, reminder, notification

    def run_scheduler():
        while True:
            schedule.run_pending()
            time.sleep(1)

    scheduler_thread = threading.Thread(target=run_scheduler)
    scheduler_thread.start()

    return app


