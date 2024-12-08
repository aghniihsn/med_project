from app.model.user import User

from app import response, app, db
from flask import request
from flask_jwt_extended import *

import datetime

def buatAdmin():
    try :
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        level = 1 

        Users = User(name=name, email=email, level=level)
        Users.setPassword(password)
        db.session.add(Users)
        db.session.commit()

        return response.succes('','Succes Menambahkan Data Admin!')
    except Exception as e:
        print(e)
        

def singleObject(data):
    data = {
        'id' : data.id,
        'name' : data.name,
        'email' : data.email,
        'level' : data.level
    }

    return data

def login():
    try:
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()

        if not user:
            return response.BadRaquest([], 'Email Tidak Terdaftar')
        
        if not user.checkPassword(password):
            return response.BadRaquest([], 'Kombinasi Password Salah')
        

        data = singleObject(user)

        expires = datetime.timedelta(days=7)
        expires.refresh = datetime.timedelta(days=7)

        acces_token = create_access_token(data, fresh=True, expires_delta = expires)
        refresh_token = create_refresh_token(data, expires_delta=expires_refresh)

        return response.succes({
            "data" : data,
            "acces_token" : acces_token,
            "refresh_token" : refresh_token,
        }, "Succes Login!")
    except Exception as e:
       print(e)