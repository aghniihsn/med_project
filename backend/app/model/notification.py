from app import db
from datetime import datetime

class Notification(db.Model):
    id_notification = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    message = db.Column(db.String(100), nullable=False)
    sent_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    delay = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    id_reminder = db.Column(db.BigInteger, db.ForeignKey('reminder.id_reminder', ondelete='CASCADE'))

    def __repr__(self):
        return '<Notification {}>'.format(self.id_notification)
