from app import db
from datetime import datetime

class Reminder(db.Model):
    id_reminder = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    reminder_time = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(50), nullable=False)  
    sent_at = db.Column(db.DateTime, nullable=True)  

    def __repr__(self):
        return '<Reminder {}>'.format(self.id_reminder)