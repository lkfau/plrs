from flask import request,Blueprint, jsonify
from flask_cors import cross_origin
from ..database.db_connection import run_query as query
from ..security.crypt_functions import session_ids, custom_hash


def login_no_session():
    email = request.args.get('email', default=0, type=str)
    #use to find related pwd

    pwd = request.args.get('pwd', default=0, type=str)
    #hash and then check against stored hash if same then pass a new session id
    print(pwd)
    pwd = custom_hash(pwd)
    checkpwd = query('get_password_hash.sql', [email], "one")
    if checkpwd[0] == pwd:
        #create and save a session id then pass back the session id and user id
        user_session = session_ids()
        user_session.save_session(pwd)
        return user_session.session_id_value, 200
    else:
        return 'Password or email incorrect', 400

def login_with_session():
    input_session_id = request.args.get('session_id', default=0, type=str)
    print('input_session_id', input_session_id)
    user_session = session_ids(session_id_value=input_session_id)
    print(user_session.session_id_bday)
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
    if 'session_id' in request.args:
        return login_with_session()
    else:
        return login_no_session()

    
