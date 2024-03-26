from flask import request, Blueprint, jsonify
from ..database.db_connection import run_query as query
from ..endpoints.login import check_session, grab_user_info

# Preferences: object return type for /preferences requests
class Preferences:
    def __init__(self, query_result = None, request_data = None):

        # case 1: create instance from database (load)
        if query_result != None:
            self.first_or_last_location = query_result[0]
            self.max_walking_distance = query_result[1]
            self.multiple_parks = query_result[2]

        # case 2: create instance from front-end request (save)
        else:
            self.first_or_last_location = request_data['first_or_last_location']
            self.max_walking_distance = request_data['max_walking_distance']
            self.multiple_parks = request_data['multiple_parks']

# load user preferences
def get_preferences(user_id):
    query_result = query('get_user_preferences.sql', [user_id], 'one') #get preferences
    user_preferences = Preferences(query_result=query_result)
    return user_preferences

# save user preferences
def save_preferences(user_id, new_preferences):
    save_result = query('save_user_preferences.sql', [
        1 if new_preferences.first_or_last_location else 0,
        new_preferences.max_walking_distance,
        1 if new_preferences.multiple_parks else 0,
        user_id
    ])
    return save_result

# create endpoint
app_settings = Blueprint('app_settings', __name__)

# add routes
@app_settings.route('/preferences', methods=['GET', 'POST'])
@app_settings.route('/permits', methods=['GET', 'POST'])

# /preferences
def preferences():

    bearer = request.headers.get('Authorization')
    if (not bearer) or (not check_session(bearer.split()[1])): 
        return jsonify({'message': 'Unauthorized'}), 401
    userinfo = grab_user_info(bearer.split()[1])
    try:

        # case 1: get user preferences
        if request.method == 'GET':
            user_id = userinfo.user_id
            user_preferences = get_preferences(user_id)
            return jsonify(user_preferences.__dict__), 200
        
        # case 2: save user preferences
        elif request.method == 'POST':
            user_id = userinfo.user_id
            request_data = request.get_json()
            user_preferences = Preferences(request_data=request_data)
            save_status = save_preferences(user_id, user_preferences)
            if (save_status):
                return 'Preferences successfully saved.', 200
            else:
                return 'User not found.', 404
        
        else:
            return 'Unsupported request method.', 405
        
    except Exception as error:
        print('Server error: ', error)
        return 'Server error', 500