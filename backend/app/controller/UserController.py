from app.model.user import User
from flask_jwt_extended import jwt_required, verify_jwt_in_request, get_jwt_identity, create_access_token, create_refresh_token

from app import response, app, db
from flask import request
from flask_jwt_extended import *

import datetime   

def singleObject(data):
    data = {
        'id' : data.id,
        'name' : data.name,
        'email' : data.email,
    }

    return data

def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()

        if not user:
            return response.BadRequest([], 'Email Tidak Terdaftar')
        
        if not user.checkPassword(password):
            return response.BadRequest([], 'Kombinasi Password Salah')
        
        data_user = {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }

        expires = datetime.timedelta(days=7)
        refresh_expires = datetime.timedelta(days=7)

        access_token = create_access_token(identity=data_user, fresh=True, expires_delta=expires)
        refresh_token = create_refresh_token(identity=data_user, expires_delta=refresh_expires)

        return response.success({
            "data": data_user,
            "access_token": access_token,
            "refresh_token": refresh_token,
        }, "Success Login!")
    except Exception as e:
        print(e)
        return response.error([], "Gagal Login")
    
@jwt_required()  # Validasi token otomatis
def get_user_by_token():
    try:
        current_user = get_jwt_identity()  # Ambil data user dari token
        if not current_user:
            return response.BadRequest([], "Token tidak valid atau user tidak ditemukan")
        return response.success(current_user, "Token valid")
    except Exception as e:
        print(e)
        return response.error([], "Gagal memvalidasi token")

def registerUser():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        phone_number = data.get('phone_number')
        password = data.get('password')

        if not all([name, email, phone_number, password]):
            return response.BadRequest([], "Semua field harus diisi!")

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return response.BadRequest([], "Email sudah digunakan!")

        existing_phone = User.query.filter_by(no_telp=phone_number).first()
        if existing_phone:
            return response.BadRequest([], "Nomor telepon sudah digunakan!")

        new_user = User(name=name, email=email, no_telp=phone_number)
        new_user.setPassword(password)

        db.session.add(new_user)
        db.session.commit()

        return response.success([], "User berhasil didaftarkan!")
    except Exception as e:
        print(e)
        return response.error([], "Gagal mendaftarkan user!")
