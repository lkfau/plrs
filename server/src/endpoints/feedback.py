from datetime import datetime
from datetime import timedelta
from ..database.db_connection import run_query as query, run_scalar as scalar
from flask import request, Blueprint, jsonify
from ..endpoints.login import check_session

class UserFeedback:
    def __init__(self, request_data = None, query_result = None):
        if (request_data != None):
            self.lot_id = request_data['lot_id']
            self.user_id = 0
            self.lot_is_full = request_data['lot_is_full']
        elif (query_result != None):
            self.lot_id = query_result[0]
            self.lot_is_full = query_result[1]
            self.date_created = query_result[2]

def get_user_feedback(max_minutes_ago):
    curtime = datetime.now()
    max_mins_delta = timedelta(minutes=max_minutes_ago)
    time_diff = curtime - max_mins_delta

    #run query
    query_result = query("get_feedback.sql", [time_diff], "all")
    #deserialize result into UserFeedback array
    feedback_result = list(map(lambda feedback : UserFeedback(query_result=feedback), query_result))
    return feedback_result


def save_user_feedback(feedback):
    #run scalar
    user_feedback_result = scalar("add_user_feedback", [
        feedback.user_id, 
        feedback.lot_id, 
        feedback.lot_is_full,
        datetime.now()
    ], "one")
    return user_feedback_result



app_feedback = Blueprint('app_feedback', __name__)
@app_feedback.route('/feedback', methods=['POST'])

def feedback():
    
    guest = False
    bearer = request.headers.get('Authorization')
    print(bearer)
    if bearer:
        bearer = request.headers.get('Authorization')
        userinfo = check_session(bearer.split()[1])
        if (not bearer) or (not userinfo): 
            return jsonify({'message': 'Unauthorized'}), 401
    else:
        guest = True
    
    request_data = request.get_json()
    # get feedback from request
    if guest:
        feedback = UserFeedback(request_data=request_data)
        feedback.user_id = 0
    else:
        feedback = UserFeedback(request_data=request_data)
        feedback.user_id = userinfo.user_id

    # save feedback
    query_result = save_user_feedback(feedback)
    print(query_result)
    # return result
    if query_result:
        return 'Feedback successfully saved', 200
    else:
        return 'Error returning feedback', 500
   