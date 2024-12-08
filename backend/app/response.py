from flask import jsonify, make_response

def succes(values, message):
    res = {
        'data' : values,
        'message' : message
    }
    return make_response(jsonify(res)),200
    
def BadRaquest(values, message):
    res = {
        'data' : values,
        'message' : message
    }
    return make_response(jsonify(res)),400