from app.model.reminder import Reminder
from app.model.medicine import Medicine

from app import response, app, db
from flask import request
 
# def index():
#     try:
#         reminder = Reminder.query.all()
#         data = formatarray(reminder)
#         return response.success(data, "success")
#     except Exception as e:
#         print(e)

# def formatarray(datas):
#     array = []

#     for i in datas:
#         array.append(singleObject(i))

#     return array

# def singleObject(data):
#     data = {
#         'id_reminder' : data.id_reminder,
#         'reminder_time' : data.reminder_time,
#         'status' : data.status,
#         'sent_at' : data.sent_at,
#         'id_medicine' : data.id_medicine
#     }
#     return data

def detail(id):
    try:
        reminder = Reminder.query.filter_by(id_reminder=id).first()
        medicine = Medicine.query.filter(Medicine.id_medicine == id)

        if not reminder:
            return response.BadRequest([], 'Tidak ada data reminder')
        
        datamedicine = formatMedicine(medicine)

        data = singleDetailMedicine(reminder, datamedicine)

        return response.success(data, "success")
    except Exception as e:
        print(e)
    
def singleDetailMedicine(reminder, medicine):
    data = {
        'id_reminder' : reminder.id_reminder,
        'reminder_time' : reminder.reminder_time,
        'status' : reminder.status,
        'sent_at' : reminder.sent_at,
        'id_medicine' : medicine
    }
    return data

def singleMedicine(medicine):
    data = {
        'id_medicine' : medicine.id_medicine,
        'medicine_name' : medicine.medicine_name,
        'dosage' : medicine.dosage,
        'frequency' : medicine.frequency,
        'start_ date' : medicine.start_date,
        'end_date' : medicine.end_date
    }
    return data

def formatMedicine(data):
    array = []
    for i in data :
        array.append(singleMedicine(i))
    return array

# def save():
#     try:
#         reminder_time = request.form.get('reminder_time')
#         status = request.form.get('status')
#         sent_at = request.form.get('sent_at')

#         reminders = Reminder(reminder_time=reminder_time, status=status, sent_at=sent_at)
#         db.session.add(reminders)
#         db.session.commit()

#         return response.success('', 'Sukses Menambahkan Data Reminder')
#     except Exception as e:
#         print(e)

def save():
    try:
        # Ambil data dari request
        reminder_time = request.form.get('reminder_time')
        status = request.form.get('status')
        sent_at = request.form.get('sent_at')
        id_medicine = request.form.get('id_medicine')  # ID Medicine dari request

        # Validasi apakah id_medicine ada di tabel Medicine
        medicine = Medicine.query.filter_by(id_medicine=id_medicine).first()
        if not medicine:
            return response.error('', 'Medicine dengan ID tersebut tidak ditemukan')

        # Buat entri Reminder
        reminder = Reminder(
            reminder_time=reminder_time,
            status=status,
            sent_at=sent_at,
            id_medicine=id_medicine
        )
        db.session.add(reminder)
        db.session.commit()

        return response.success('', 'Sukses Menambahkan Data Reminder')
    except Exception as e:
        print(e)
        return response.error('', 'Gagal Menambahkan Data Reminder')
    
def get_all_reminders():
    try:
        results = db.session.query(Reminder, Medicine).join(Medicine, Reminder.id_medicine == Medicine.id_medicine).all()
        data = []
        for reminder, medicine in results:
            data.append({
                'id_reminder': reminder.id_reminder,
                'reminder_time': reminder.reminder_time,
                'status': reminder.status,
                'medicine_name': medicine.medicine_name,
                'dosage': medicine.dosage,
                'frequency': medicine.frequency,
                'start_date': medicine.start_date,
                'end_date': medicine.end_date
            })
        return response.success(data, 'Sukses Mengambil Data')
    except Exception as e:
        print(e)
        return response.error('', 'Gagal Mengambil Data')

def ubah(id_reminder):
    try:
        reminder_time = request.form.get('reminder_time')
        status = request.form.get('status')
        sent_at = request.form.get('sent_at')

        input = [
            {
                'reminder_time' : reminder_time,
                'status' : status,
                'sent_at' : sent_at
            }
        ]

        reminder = Reminder.query.filter_by(id_reminder=id_reminder).first()

        reminder.reminder_time = reminder_time
        reminder.status = status
        reminder.sent_at = sent_at

        db.session.commit()

        return response.success(input, 'Sukses Update Data!')
    except Exception as e:
        print(e)

def hapus(id):
    try:
        reminder = Reminder.query.filter_by(id_reminder=id).first()
        if not reminder:
            return response.BadRequest([], 'Data Reminder Kosong.....')
        
        db.session.delete(reminder)
        db.session.commit()

        return response.success('', 'Berhasil menghapus data!')
    except Exception as e:
        print(e)