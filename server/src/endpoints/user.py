from flask import request,Blueprint, jsonify
from flask_cors import cross_origin
from ..database.db_connection import run_query as query
from ..security.crypt_functions import session_ids, custom_hash
from ..email.email import send_email
import random
import string

app_user = Blueprint('app_user', __name__)
@app_user.route('/create_user', methods=['POST'])
@cross_origin()
def create_user():
    request_data = request.get_json()
    email = request_data['email']
    pwd = request_data['pwd']

    
    auth_code = (
        ''.join(random.choices(string.ascii_uppercase + string.digits, k=3))
        + '-' +
        ''.join(random.choices(string.ascii_uppercase + string.digits, k=3))
    )

    send_email_result = send_email(
        email,
        'Your PLRS Email Verification Code', 
        f'Your email authentication code is {auth_code}.'
    )

    if send_email_result:
        return 'Email sent', 200
    else:
        return 'Email failed to send', 500
   
    # if email == '' or pwd == '':
    #     return 'Error; New user must have an email and password', 404
    # pwd = custom_hash(pwd)
    # user = [email, pwd]
    # query("create_user.sql", user)
    # return 'Created new user', 200

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
    return jsonify({'message': 'Updated user.'}), 200

app_update_user_password = Blueprint('app_update_user_password', __name__)
@app_update_user_password.route('/update_user_password', methods=['PUT'])
@cross_origin()
def update_user_password():
    request_data = request.get_json()
    pwd = request_data['pwd']
    user_id = request_data['user_id']
    if pwd == '':
        return jsonify({'message': 'Error; User must have a password'}), 404
    pwd = custom_hash(pwd)
    user = [pwd, user_id]
    query("update_user_password.sql", user)
    return jsonify({'message': 'Updated user.'}), 200

