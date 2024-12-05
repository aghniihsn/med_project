from app import db
from datetime import datetime

class Medicine(db.Model):
    id_medicine = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    medicine_name = db.Column(db.String(250), nullable=False)
    dosage = db.Column(db.String(100), nullable=False)
    frequency = db.Column(db.String(100), nullable=False)
    start_date = db.Column(db.DateTime, default=datetime.utcnow)
    end_date = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return '<Medicine {}>'.format(self.medicine_name)