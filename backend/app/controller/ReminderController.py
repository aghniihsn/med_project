from app.model.reminder import Reminder
from app.model.medicine import Medicine

from app import response, app, db
from flask import request
 
def show():
    try:
        results = db.session.query(Reminder, Medicine).join(Medicine, Reminder.id_medicine == Medicine.id_medicine).all()
        data = []
        for reminder, medicine in results:
            data.append({
                'id_reminder': reminder.id_reminder,
                'reminder_time': reminder.reminder_time,
                'status': reminder.status,
                'description' : reminder.description,
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

def save():
    try:
        # Ambil data dari request
        reminder_time = request.form.get('reminder_time')  # Data untuk Reminder
        status = request.form.get('status')               # Data untuk Reminder
        description = request.form.get('description')     # Data untuk Reminder
        sent_at = request.form.get('sent_at')             # Data untuk Reminder

        medicine_name = request.form.get('medicine_name')  # Data untuk Medicine
        dosage = request.form.get('dosage')               # Data untuk Medicine
        frequency = request.form.get('frequency')         # Data untuk Medicine
        start_date = request.form.get('start_date')       # Data untuk Medicine
        end_date = request.form.get('end_date')           # Data untuk Medicine

        # Simpan data ke tabel Medicine terlebih dahulu
        medicine = Medicine(
            medicine_name=medicine_name,
            dosage=dosage,
            frequency=frequency,
            start_date=start_date,
            end_date=end_date
        )
        db.session.add(medicine)
        db.session.commit()  # Commit untuk mendapatkan ID Medicine

        # Simpan data ke tabel Reminder dengan ID Medicine sebagai foreign key
        reminder = Reminder(
            reminder_time=reminder_time,
            status=status,
            description=description,
            sent_at=sent_at,
            id_medicine=medicine.id_medicine  # Hubungkan dengan tabel Medicine
        )
        db.session.add(reminder)
        db.session.commit()

        return response.success('', 'Sukses Menambahkan Data Reminder dan Medicine')
    except Exception as e:
        print(e)
        db.session.rollback()  # Rollback jika ada error
        return response.error('', 'Gagal Menambahkan Data Reminder dan Medicine')

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