from flask import request,Blueprint, jsonify
from flask_cors import cross_origin
from ..database.db_connection import run_query as query
from ..security.crypt_functions import session_ids, custom_hash
from ..endpoints.login import check_session
from ..email.email import send_email
import random
import string
import threading
import time

def delete_unverified_session(session_id):
    time.sleep(300)
    query('delete_unverified_session.sql', [session_id])

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

    if email == '' or pwd == '':
        return 'Error; New user must have an email and password', 404
        
    pwd = custom_hash(pwd)

    create_user_result = query("create_user.sql", [email, pwd, auth_code, email])

    if create_user_result:
        user_session = session_ids()
        user_session.save_session(email, pwd)

        send_email_result = send_email(
            email,
            'Your PLRS Email Verification Code', 
            f'Your email authentication code is {auth_code}.'
        )

        threading.Thread(target=delete_unverified_session, args=(user_session.session_id_value,)).start()

        if send_email_result:
            return jsonify({'message': 'Created user.', 'session_id': user_session.session_id_value, 'email_sent': True}), 200
        else:
            return jsonify({'message': 'Created user. Email failed to send.', 'email_sent': False}), 500
    else:
        return jsonify({'message': 'User with email already exists.'}), 409

@app_user.route('/verify_user_email', methods=['POST'])
@cross_origin()
def verify_user_email():
    print('1')
    bearer = request.headers.get('Authorization')
    if bearer:
        userinfo = check_session(bearer.split()[1], email_verified=False)
    if (not bearer or not userinfo):
        return jsonify({'message': 'Unauthorized'}), 401
    
    request_data = request.get_json()
    print('2')
    auth_code = request_data['auth_code']
    user_id = userinfo.user_id

    verify_auth_code_result = query('verify_auth_code.sql', [user_id, auth_code])

    if verify_auth_code_result:
        return jsonify({'message': 'Verified user email.'}), 200
    else:
        return jsonify({'message': 'Failed to verify auth code'}), 401

@app_user.route('/update_user_email', methods=['POST'])
@cross_origin()
def update_user_email(): 
      bearer = request.headers.get('Authorization')
      if bearer:
          userinfo = check_session(bearer.split()[1])
      if (not bearer or not userinfo):
          return jsonify({'message': 'Unauthorized'}), 401
      
      request_data = request.get_json()
      email = request_data['email']
      user_id = userinfo.user_id

      if email and email != '':
          query_result = query("update_user_email.sql", [email, user_id])
          if query_result:
              return jsonify({'message': 'Updated user email.'}), 200
          else:
              return jsonify({'message': 'Error updating user.'}), 500
      else:
          return jsonify({'message': 'Invalid email address.'}), 400
      
@app_user.route('/update_user_password', methods=['POST'])
@cross_origin()
def update_user_password(): 
      bearer = request.headers.get('Authorization')
      if bearer:
          userinfo = check_session(bearer.split()[1])
      if (not bearer or not userinfo):
          return jsonify({'message': 'Unauthorized'}), 401
      
      request_data = request.get_json()
      old_pwd = request_data['old_pwd']
      new_pwd = request_data['new_pwd']
      old_pwd = custom_hash(old_pwd)
      new_pwd = custom_hash(new_pwd)
      user_id = userinfo.user_id

      if new_pwd and len(new_pwd) >= 3: 
          query_result = query("update_user_password.sql", [new_pwd, old_pwd, user_id])
          print(query_result)
          if query_result:
              return jsonify({'message': 'Updated user password.'}), 200
          else:
              return jsonify({'message': 'Old password is incorrect.'}), 400
      else:
          return jsonify({'message': 'Invalid password.'}), 400