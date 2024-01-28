from datetime import datetime
from datetime import timedelta
from ..database.db_connection import run_query as query
from flask import request, Blueprint

class UserFeedback:
    def __init__(self, request_data = None, query_result = None):
        if (request_data != None):
            self.lot_id = request_data['lot_id']
            self.user_id = request_data['user_id']
            self.lot_is_full = request_data['lot_is_full']
        elif (query_result != None):
            self.lot_id = request_data[0]
            self.lot_is_full = request_data[1]
            self.date_created = request_data[2]

def get_user_feedback(max_minutes_ago):

    #run query
    query_result = query("get_feedback.sql", [max_minutes_ago], "all")
    print(query_result)
    #deserialize result into UserFeedback array
    feedback_result = list(map(lambda feedback : UserFeedback(query_result=feedback), query_result))
    return feedback_result


def save_user_feedback(feedback):

    #run query
    user_feedback_result = query("add_user_feedback.sql", [
        feedback.lot_id, 
        feedback.user_id, 
        1 if feedback.lot_is_full else 0, 
        datetime.now()
    ])
    print('result', user_feedback_result)
    return user_feedback_result



app_feedback = Blueprint('app_feedback', __name__)
@app_feedback.route('/feedback', methods=['POST'])

def feedback():
    request_data = request.get_json()

    # get feedback from request
    feedback = UserFeedback(request_data=request_data)

    # save feedback
    print('test')
    query_result = save_user_feedback(feedback)

    # return result
    if query_result:
        return 'Feedback successfully saved', 200
    else:
        return 'Error returning feedback', 500
   