from flask import request,Blueprint, jsonify
from flask_cors import cross_origin
from ..database.db_connection import run_query as query
from ..security.crypt_functions import session_ids, custom_hash

class user_info:
    def __init__(self, query_result):
        self.user_id = query_result[0]
        self.email_verified = query_result[1]
        self.distance_or_vacancy = query_result[2]
        self.last_schedule_id = query_result[3]
        self.first_or_last_location = query_result[4]

def grab_user_info(session_id):
    query_result = query("get_user_info.sql", [session_id], "one")
    return user_info(query_result)

def login_no_session(email, pwd):
    
    #hash and then check against stored hash if same then pass a new session id
    pwd = custom_hash(pwd)
    checkpwd = query('get_password_hash.sql', [email], "one")

    if checkpwd and checkpwd[0] == pwd: 
        #create and save a session id then pass back the session id and user id
        user_session = session_ids()
        user_session.save_session(email, pwd)

        return jsonify(user_session.session_id_value), 200
    else:
        return 'Password or email incorrect', 400


def grab_user_info(session_id):
    query_result = query("get_user_info.sql", [session_id], "one")
    return user_info(query_result)

def check_session(session_id):
    user_session = session_ids(session_id_value=session_id)
    if user_session.session_id_value and not user_session.too_old():
        query_result = query("get_user_info.sql", [session_id], "one")
        return user_info(query_result)
    else:
        return False


app_login = Blueprint('app_login', __name__)
@app_login.route('/login', methods=['POST'])
@cross_origin()

def login():
    
    request_data = request.get_json()

    if 'session_id' in request_data:
        if check_session(request_data['session_id']):
            return 'Logged in', 200
        else:
            return 'Session ID invalid', 400
        
    else:
        return login_no_session(request_data['email'], request_data['pwd'])

    
