from app import db
from datetime import datetime
from app.model.medicine import Medicine

class Reminder(db.Model):
    id_reminder = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    reminder_time = db.Column(db.Time, nullable=False)
    status = db.Column(db.String(50), nullable=False)  
    description = db.Column(db.Text, nullable=True)
    sent_at = db.Column(db.DateTime, nullable=True)  
    id_medicine = db.Column(db.BigInteger, db.ForeignKey(Medicine.id_medicine, ondelete='CASCADE'))

    def __repr__(self):
        return '<Reminder {}>'.format(self.id_reminder)