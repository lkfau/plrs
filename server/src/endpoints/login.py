from flask import request,Blueprint, jsonify
from flask_cors import cross_origin
from ..database.db_connection import run_query as query
from ..security.crypt_functions import session_ids, custom_hash


def login_no_session(email, pwd):
    
    #hash and then check against stored hash if same then pass a new session id
    pwd = custom_hash(pwd)
    checkpwd = query('get_password_hash.sql', [email], "one")

    if checkpwd[0] == pwd:   
        #create and save a session id then pass back the session id and user id
        user_session = session_ids()
        user_session.save_session(pwd)

        return jsonify(user_session.session_id_value), 200
    else:
        return 'Password or email incorrect', 400

def login_with_session(session_id):

    user_session = session_ids(session_id_value=session_id)

    if user_session.too_old():
        return 'Session ID too old', 401
    elif user_session.session_id_value == 0:
        return 'Error; Invalid Session ID', 400
    else:
        return 'Session ID is good', 200

app_login = Blueprint('app_login', __name__)
@app_login.route('/login', methods=['POST'])
@cross_origin()

def login():
    
    request_data = request.get_json()
    if 'session_id' in request_data:
        return login_with_session(request_data['session_id'])
    else:
        return login_no_session(request_data['email'], request_data['pwd'])

    
