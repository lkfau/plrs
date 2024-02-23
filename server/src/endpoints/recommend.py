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
def get_best_distance(dest_x1, dest_y1, dest_x2, dest_y2, lot_x1, lot_y1, lot_x2, lot_y2):
    # find distance from destination to all four corners of the parking lot and all four corners of destination
    # return the closest distance found to give each lot the best chance
    distances = [
        distance(lot_x1, lot_y1, dest_x1, dest_y1),
        distance(lot_x1, lot_y2, dest_x1, dest_y1),
        distance(lot_x2, lot_y1, dest_x1, dest_y1),
        distance(lot_x2, lot_y2, dest_x1, dest_y1),
        distance(lot_x1, lot_y1, dest_x1, dest_y2),
        distance(lot_x1, lot_y2, dest_x1, dest_y2),
        distance(lot_x2, lot_y1, dest_x1, dest_y2),
        distance(lot_x2, lot_y2, dest_x1, dest_y2),
        distance(lot_x1, lot_y1, dest_x2, dest_y1),
        distance(lot_x1, lot_y2, dest_x2, dest_y1),
        distance(lot_x2, lot_y1, dest_x2, dest_y1),
        distance(lot_x2, lot_y2, dest_x2, dest_y1),
        distance(lot_x1, lot_y1, dest_x2, dest_y2),
        distance(lot_x1, lot_y2, dest_x2, dest_y2),
        distance(lot_x2, lot_y1, dest_x2, dest_y2),
        distance(lot_x2, lot_y2, dest_x2, dest_y2)
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

def calc_lot_fullness_float(lot_id, curtime, user_responses):
    lot_fullness_float = 0
    i = 0
    for response in user_responses:
        if response.lot_id == lot_id:
            timediff = curtime - response.date_created
            #make the response become weighted less as it gets older
            if response.lot_is_full == 1:
                lot_fullness_float += 1 - (1.02 ** (-((2101 - timediff.total_seconds()) / 7.1)))
            i += 1
    if i > 0:
        lot_fullness_float = lot_fullness_float / i
    else:
        lot_fullness_float = 0
    return lot_fullness_float

# create endpoint
app_recommend = Blueprint('app_recommend', __name__)
@app_recommend.route('/recommend', methods=['GET'])

def recommend():
    # get parameters
    schedule = request.args.get('schedule', default=False, type=bool)
    if schedule:
        user_preference = request.args.get('user_preference', default=-1, type=int)
        schedule_data = request.get_json()

        if user_preference == 0:
            building_id = schedule_data[0]['items'][0]['building_id']
        elif user_preference == 1:
            building_id = schedule_data[-1]['items'][-1]['building_id']
        else: 
            print("Error invalid user preference.")
            return 'Error invalid user preference.', 500 
    else:
        building_id = request.args.get('building_id', default=0, type=int)

    permit_type_id = request.args.get('permit_type_id', default=0, type=int)
    user_responses = get_user_feedback(30) #get all user responses from last 30 mins
    curtime = request.args.get('test_date', default=datetime.now(), type=str)

        # get necessary data
    lots = get_parking_lots(permit_type_id)
    destination = get_destination(building_id)


        # iteratively deserialize lots into LotRecommendation object array
    for lot in lots:
           lot.feet_to_destination = get_best_distance(destination.latitude, destination.longitude, destination.latitude, destination.longitude, lot.lot_rect[0], lot.lot_rect[1], lot.lot_rect[2], lot.lot_rect[3])
           
           lot.latitude= (lot.lot_rect[0] + lot.lot_rect[2]) / 2
           lot.longitude= (lot.lot_rect[1] + lot.lot_rect[3]) / 2
           del lot.lot_rect

           lot.fullness = calc_lot_fullness_float(lot.lot_id, curtime, user_responses)

    # sort lots and call the function with user not preferring vacancy just to test
    lots = sort_lots(lots, 0)

    return jsonify(list(map(lambda lot: lot.__dict__, lots[0:3]))), 200