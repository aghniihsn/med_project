from app.model.user import User
from flask_jwt_extended import jwt_required, get_jwt_identity

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

from flask import request
from flask_jwt_extended import create_access_token, create_refresh_token
import datetime
from app.model.user import User
from app import response

def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return response.BadRequest([], 'Email dan Password wajib diisi!')

        user = User.query.filter_by(email=email).first()

        if not user:
            return response.BadRequest([], 'Email Tidak Terdaftar')
        
        if not user.checkPassword(password):  
            return response.BadRequest([], 'Kombinasi Email dan Password Salah')
        
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
        print(f"Error saat login: {e}")
        return response.error([], "Gagal Login")
    
def getUserbyToken():
    try:
        # Mendapatkan data user dari token JWT
        current_user = get_jwt_identity()

        if not current_user:
            return response.error([], "Invalid Token", 401)

        # Respon data user yang ada di token
        user_data = {
            "email": current_user['email'],  # Key ini harus sesuai dengan payload JWT
            "id": current_user['id'],       # Data tambahan dari token
            "full_name": current_user['full_name']  # Contoh field tambahan
        }
        return response.success(user_data, "User authenticated successfully")
    except Exception as e:
        print(f"Error: {e}")
        return response.error([], "Something went wrong", 500)

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
