from app.model.reminder import Reminder
from app.model.medicine import Medicine
from app.controller.NotifController import send_message
from datetime import datetime, timedelta
from threading import Thread
import schedule
import time

from app import response, app, db
from flask import request, jsonify
 
def run_schedule():
    while True:
        schedule.run_pending()
        time.sleep(1)

def show():
    try:
        results = db.session.query(Reminder, Medicine).join(Medicine, Reminder.id_medicine == Medicine.id_medicine).all()
        data = []
        for reminder, medicine in results:
            data.append({
                'id_reminder': reminder.id_reminder,
                'reminder_time': reminder.reminder_time.strftime('%H:%M:%S') if reminder.reminder_time else None,  # Konversi time ke string
                'status': reminder.status,
                'description': reminder.description,
                'medicine_name': medicine.medicine_name,
                'dosage': medicine.dosage,
                'frequency': medicine.frequency,
                'start_date': medicine.start_date.strftime('%Y-%m-%d') if medicine.start_date else None,  # Format tanggal
                'end_date': medicine.end_date.strftime('%Y-%m-%d') if medicine.end_date else None,  # Format tanggal
            })
        return response.success(data, 'Sukses Mengambil Data')
    except Exception as e:
        print(e)
        return response.error('', 'Gagal Mengambil Data')

def detail(id):
    try:
        # Ambil data Reminder dengan join ke tabel Medicine
        result = db.session.query(Reminder, Medicine).join(Medicine, Reminder.id_medicine == Medicine.id_medicine).filter(Reminder.id_reminder == id).first()

        if not result:
            return response.error('', 'Data tidak ditemukan')

        reminder, medicine = result
        data = {
            'id_reminder': reminder.id_reminder,
            'reminder_time': reminder.reminder_time,
            'status': reminder.status,
            'description' : reminder.description,
            'medicine_name': medicine.medicine_name,
            'dosage': medicine.dosage,
            'frequency': medicine.frequency,
            'start_date': medicine.start_date,
            'end_date': medicine.end_date
        }

        return response.success(data, 'Sukses Mengambil Detail Data')
    except Exception as e:
        print(e)
        return response.error('', 'Gagal Mengambil Detail Data')

def schedule_reminders(start_date, reminder_time, frequency, token, target, message):
    interval = 24 * 60 // frequency  # Total menit dalam sehari dibagi frekuensi
    for i in range(frequency):
        reminder_datetime = datetime.combine(start_date, reminder_time) + timedelta(days=i)
        schedule_time = reminder_datetime.strftime('%H:%M')
        print(f"Scheduling message for {schedule_time}")  # Debugging
        schedule.every().day.at(schedule_time).do(lambda t=token, tg=target, msg=message: send_message(t, tg, msg))
        
def save():
    try:
        data = request.json
        reminder_time_str = data.get('reminder_time')
        status = data.get('status')              
        description = data.get('description')    
        token = data.get('token') 
        target = data.get('target') 
        message = data.get('message') 
        frequency = data.get('frequency')  
        start_date_str = data.get('start_date')  

        reminder_time = datetime.strptime(reminder_time_str, '%H:%M:%S').time()  
        start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()  

        medicine = Medicine(
            medicine_name=data.get('medicine_name'),
            dosage=data.get('dosage'),
            frequency=frequency,
            start_date=start_date,
            end_date=data.get('end_date')
        )
        db.session.add(medicine)
        db.session.commit() 

        reminder = Reminder(
            reminder_time=reminder_time,
            status=status,
            description=description,
            id_medicine=medicine.id_medicine  
        )
        db.session.add(reminder)
        db.session.commit()

        #set jadwal kirim pesan
        schedule_reminders(start_date, reminder_time, frequency, token, target, message)

        return jsonify({"status": "success", "message": "Sukses Menambahkan Data Reminder dan Medicine"})
    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({"status": "error", "message": "Gagal Menambahkan Data Reminder dan Medicine"})
              
def ubah(id_reminder):
    try:
        # Ambil data Reminder berdasarkan ID
        reminder = Reminder.query.filter_by(id_reminder=id_reminder).first()
        if not reminder:
            return response.error('', 'Data Reminder tidak ditemukan')

        # Ambil data Medicine berdasarkan ID Medicine dari Reminder
        medicine = Medicine.query.filter_by(id_medicine=reminder.id_medicine).first()
        if not medicine:
            return response.error('', 'Data Medicine tidak ditemukan')

        # Ambil data dari request untuk Reminder
        reminder_time = request.form.get('reminder_time')
        status = request.form.get('status')
        description = request.form.get('description')
        sent_at = request.form.get('sent_at')

        # Update data Reminder
        reminder.reminder_time = reminder_time
        reminder.status = status
        reminder.description = description
        reminder.sent_at = sent_at

        # Ambil data dari request untuk Medicine
        medicine_name = request.form.get('medicine_name')
        dosage = request.form.get('dosage')
        frequency = request.form.get('frequency')
        start_date = request.form.get('start_date')
        end_date = request.form.get('end_date')

        # Update data Medicine
        medicine.medicine_name = medicine_name
        medicine.dosage = dosage
        medicine.frequency = frequency
        medicine.start_date = start_date
        medicine.end_date = end_date

        # Commit perubahan
        db.session.commit()

        return response.success('', 'Sukses Mengupdate Data Reminder dan Medicine')
    except Exception as e:
        print(e)
        db.session.rollback()
        return response.error('', 'Gagal Mengupdate Data Reminder dan Medicine')

def hapus(id_reminder):
    try:
        # Ambil data Reminder berdasarkan ID
        reminder = Reminder.query.filter_by(id_reminder=id_reminder).first()
        if not reminder:
            return response.error('', 'Data Reminder tidak ditemukan')

        # Ambil data Medicine berdasarkan ID Medicine dari Reminder
        medicine = Medicine.query.filter_by(id_medicine=reminder.id_medicine).first()
        if not medicine:
            return response.error('', 'Data Medicine tidak ditemukan')

        # Hapus data Reminder dan Medicine
        db.session.delete(reminder)
        db.session.delete(medicine)
        db.session.commit()

        return response.success('', 'Sukses Menghapus Data Reminder dan Medicine')
    except Exception as e:
        print(e)
        db.session.rollback()
        return response.error('', 'Gagal Menghapus Data Reminder dan Medicine')
    
# thread = Thread(target=run_schedule)
# thread.start()