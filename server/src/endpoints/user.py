from flask import request,Blueprint, jsonify
from flask_cors import cross_origin
from ..database.db_connection import run_query as query
from ..security.crypt_functions import session_ids, custom_hash



app_create_user = Blueprint('app_create_user', __name__)
@app_create_user.route('/create_user', methods=['POST'])
@cross_origin()
def create_user():
    request_data = request.get_json()
    email = request_data['email']
    pwd = request_data['pwd']
    if email == '' or pwd == '':
        return 'Error; New user must have an email and password', 404
    pwd = custom_hash(pwd)
    email_verified = False
    max_walking_distance = 10
    multiple_parks = False
    first_or_last_location = False
    user = [email, email_verified, max_walking_distance, multiple_parks, first_or_last_location, pwd]
    #email, email_verified, max_walking_distance, multiple_parks, first_or_last_location, password_hash
    query("create_user.sql", user)
    return 'Created new user', 200

app_update_user_email = Blueprint('app_update_user_email', __name__)
@app_update_user_email.route('/update_user_email', methods=['PUT'])
@cross_origin()
def update_user_email():
    request_data = request.get_json()
    email = request_data['email']
    user_id = request_data['user_id']
    if email == '':
        return 'Error; User must have an email', 404
    user = [email, user_id]
    query("update_user_email.sql", user)
    return 'Updated user', 200

app_update_user_password = Blueprint('app_update_user_password', __name__)
@app_update_user_password.route('/update_user_password', methods=['PUT'])
@cross_origin()
def update_user_password():
    request_data = request.get_json()
    pwd = request_data['pwd']
    user_id = request_data['user_id']
    if pwd == '':
        return 'Error; User must have a password', 404
    pwd = custom_hash(pwd)
    user = [pwd, user_id]
    query("update_user_pwd.sql", user)
    return 'Updated user', 200