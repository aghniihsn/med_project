from app import db
from datetime import datetime

class Notification(db.Model):
    id_notification = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    message_content = db.Column(db.Text, nullable=False)
    sent_status = db.Column(db.String(50), nullable=False)  
    sent_at = db.Column(db.DateTime, nullable=True) 

    def __repr__(self):
        return '<Notification {}>'.format(self.id_notification)