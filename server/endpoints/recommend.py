import math
from datetime import datetime
from ..endpoints.buildings import get_destination
from ..endpoints.feedback import get_user_feedback
from ..database.db_connection import run_query as query
from flask import request, Blueprint, jsonify


# LotRecommendation: object return type for /recommend requests
# constructed from query on lot and destination
class LotRecommendation:
    def __init__(self, query_result):
        self.lot_id = query_result[0]
        self.lot_name = query_result[1]
        self.lot_rect = query_result[2:6]

def get_parking_lots(permit_type_id):
    query_result = query('get_parking_lots.sql', [permit_type_id], "all") #get parking lots
    lots_result = list(map(lambda lot : LotRecommendation(query_result=lot), query_result))
    return lots_result

# distance(): returns distance between points (x1, y1) and (x2, y2)
def distance(x1, y1, x2, y2):
    distance = math.sqrt(((x2-x1)**2)+ ((y2-y1)**2))
    return distance

# get_best_distance(): returns closest distance between (dest_x, dest_y) 
#                      and corners of rectangle defined by lot_rect
def get_best_distance(dest_x, dest_y, lot_rect):
    # find distance from destination to all four corners of the parking lot
    # return the closest distance found to give each lot the best chance
    distances = [
        distance(lot_rect[0], lot_rect[1],dest_x, dest_y),
        distance(lot_rect[2], lot_rect[3],dest_x, dest_y),
        distance(lot_rect[0], lot_rect[3],dest_x, dest_y),
        distance(lot_rect[2], lot_rect[1],dest_x, dest_y)
    ]

    # coefficient converts decimal latitude degrees to feet
    return round(min(distances) * 364500)

def sort_lots(lots, user_prefers_vacancy):
    lots.sort(key = lambda lot : lot.feet_to_destination)

    for i in range(len(lots)-1):
        if user_prefers_vacancy == 1 and lots[i].fullness > 0.4:
            del lots[i]
        elif lots[i].fullness > 0.7:
            del lots[i]

    return lots

def calc_lot_fullness_float(lot_feedback):
    lot_fullness_total = 0
    for response in lot_feedback:
        timediff: datetime.timedelta = datetime.now() - response.date_created
        
        # make the response become weighted less as it gets older
        response_weight = (-timediff.total_seconds()/3600 + 1) if timediff.total_seconds() < 30 * 60 else 0
        lot_fullness_float += response.lot_is_full * response_weight

    # return average of lot fullness weights
    return 0.5 if len(lot_feedback) == 0 else lot_fullness_total / len(lot_feedback)



# create endpoint
app_recommend = Blueprint('app_recommend', __name__)
@app_recommend.route('/recommend', methods=['GET'])

def recommend():
    # get parameters
    building_id = request.args.get('building_id', default=0, type=int)
    permit_type_id = request.args.get('permit_type_id', default=0, type=int)

    # get necessary data
    lots = get_parking_lots(permit_type_id)
    destination = get_destination(building_id)
    feedback = get_user_feedback(30)

    # iteratively deserialize lots into LotRecommendation object array
    for lot in lots:
        lot.feet_to_destination = get_best_distance(destination.latitude, destination.longitude, lot.lot_rect)
        del lot.lot_rect
        feedback_for_lot = [response for response in feedback if response.lot_id == lot.lot_id]
        lot.fullness = calc_lot_fullness_float(feedback_for_lot)

    # sort lots and call the function with user not preferring vacancy just to test
    lots = sort_lots(lots, 0)

    return jsonify(list(map(lambda lot: lot.__dict__, lots[0:3]))), 200