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
    user = [email, pwd]
    query("create_user.sql", user)
    return 'Created new user', 200

