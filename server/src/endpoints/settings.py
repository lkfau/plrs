from flask import request, Blueprint, jsonify
from ..database.db_connection import run_query as query
from ..endpoints.login import check_session

# Preferences: object return type for /preferences requests
class Preferences:
    def __init__(self, request_data = None):
        # case 1: create instance from front-end request (save)
            self.first_or_last_location = request_data['first_or_last_location']
            self.distance_or_vacancy = request_data['distance_or_vacancy']

class Permit:
    def __init__(self, query_result = None):
        self.permit_type_id = query_result[0]
        if (len(query_result) > 1):
            self.type_name = query_result[1]
            self.user_has_permit = query_result[2]

# save user preferences
def save_preferences(user_id, new_preferences):
    save_result = query('save_user_preferences.sql', [
        new_preferences.first_or_last_location,
        new_preferences.distance_or_vacancy,
        user_id
    ])
    return save_result

def update_user_permits(user_id, new_permits):
    
    # 1. delete the old permits
    delete_user_permits_result = query('delete_user_permits.sql', [user_id], 'none')

    # 2. convert the schedule items to a list of tuples
    query_permits = tuple(map(lambda permit : (user_id, permit), new_permits))
    
    # 3. add the new permits to user_permit_type
    add_user_permits_result = query('add_user_permits.sql', query_permits, 'none', True)

    return delete_user_permits_result and add_user_permits_result


def get_user_permits(user_id=None):
    query_result = query('get_user_permits.sql', [user_id], 'all')
    return [permit[0] for permit in query_result]
    
def get_permits(user_id=None):
    query_result = query('get_permits.sql', [user_id], 'all')
    return list(map(lambda permit : Permit(query_result=permit), query_result))

# create endpoint
app_settings = Blueprint('app_settings', __name__)

# add routes
@app_settings.route('/preferences', methods=['GET', 'POST'])

# /preferences
def preferences():

    bearer = request.headers.get('Authorization')
    if bearer:
        userinfo = check_session(bearer.split()[1])
    if (not bearer or not userinfo): 
        return jsonify({'message': 'Unauthorized'}), 401
    
    try:

        # case 1: get user preferences
        if request.method == 'GET':
            user_id = userinfo.user_id
            user_preferences = userinfo
            return jsonify(user_preferences.__dict__), 200
        
        # case 2: save user preferences
        elif request.method == 'POST':
            user_id = userinfo.user_id
            request_data = request.get_json()
            user_preferences = Preferences(request_data=request_data)
            save_status = save_preferences(user_id, user_preferences)
            if (save_status):
                return jsonify({'message': 'Preferences successfully saved.'}), 200
            else:
                return 'User not found.', 404
        
        else:
            return jsonify({'message': 'Unsupported request method.'}), 405
        
    except Exception as error:
        print('Server error: ', error)
        return 'Server error', 500


@app_settings.route('/permits', methods=['GET', 'POST']) 
def permits():
    bearer = request.headers.get('Authorization')

    if bearer:
        userinfo = check_session(bearer.split()[1])
    if (not bearer or not userinfo):
        return jsonify({'message': 'Unauthorized'}), 401
    try:
        # case 1: get user preferences
        if request.method == 'GET':
            user_id = userinfo.user_id
            permits = get_permits(user_id)
            return jsonify(list(map(lambda permit : permit.__dict__, permits))), 200
        
        # case 2: save user preferences
        elif request.method == 'POST':
            user_id = userinfo.user_id
            request_data = request.get_json()
            save_status = update_user_permits(user_id, request_data)
            if (save_status):
                return jsonify({'message': 'Preferences successfully saved.'}), 200
            else:
                return 'User not found.', 404
        
        else:
            return jsonify({'message': 'Unsupported request method.'}), 405
    except Exception as error:
        print('Server error: ', error)
        return 'Server error', 500