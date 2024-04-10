from flask import request,Blueprint, jsonify
from flask_cors import cross_origin
from ..database.db_connection import run_query as query
from ..security.crypt_functions import custom_hash
from ..endpoints.login import check_session
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
   
    # auth_code = (
    #     ''.join(random.choices(string.ascii_uppercase + string.digits, k=3))
    #     + '-' +
    #     ''.join(random.choices(string.ascii_uppercase + string.digits, k=3))
    # )

    # send_email_result = send_email(
    #     email,
    #     'Your PLRS Email Verification Code', 
    #     f'Your email authentication code is {auth_code}.'
    # )

    # if send_email_result:
    #     return 'Email sent', 200
    # else:
    #     return 'Email failed to send', 500
  
    if email == '' or pwd == '':
        return 'Error; New user must have an email and password', 404
    pwd = custom_hash(pwd)
    query("create_user.sql", [email, pwd])
    return jsonify({'message': 'Created user.'}), 200


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