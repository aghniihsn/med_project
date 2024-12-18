from app.model.reminder import Reminder

from app import response, app, db
from flask import request

def index():
    try:
        reminder = Reminder.query.all()
        data = formatarray(reminder)
        return response.succes(data, "success")
    except Exception as e:
        print(e)

def formatarray(datas):
    array = []

    for i in datas:
        array.append(singleObject(i))

    return array

def singleObject(data):
    data = {
        'id' : data.id,
        'reminder_time' : data.reminder_time,
        'status' : data.status
    }
