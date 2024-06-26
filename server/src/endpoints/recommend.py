import math
from datetime import datetime
from ..endpoints.buildings import get_destination
from ..endpoints.feedback import get_user_feedback
from ..endpoints.login import check_session
from ..endpoints.settings import get_user_permits
from ..database.db_connection import run_query as query
from flask import request, Blueprint, jsonify


# LotRecommendation: object return type for /recommend requests
# constructed from query on lot and destination
class LotRecommendation:
    def __init__(self, query_result):
        self.lot_id = query_result[0]
        self.lot_name = query_result[1]
        self.payment_required = query_result[2]
        self.lot_rect = query_result[3:7]

def get_parking_lots(permit_type_ids):
    query_result = query('get_parking_lots.sql', [permit_type_ids], "all") #get parking lots
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

# strToDate(): converts string to date
def strToDate(dateString): 
    return datetime.strptime(dateString, "%Y-%m-%d %H:%M:%S").date()

def sort_and_filter_lots(lots, distance_or_vacancy, include_metered):
    result_lots = []
    lots.sort(key = lambda lot : lot.feet_to_destination)
    for lot in lots:
        if (include_metered or not lot.payment_required) and (
              (distance_or_vacancy == 'd' and lot.fullness < 0.65) or
              (distance_or_vacancy == 'v' and lot.fullness <= 0.4)
        ):
            result_lots.append(lot)

    return result_lots

def calc_lot_fullness_float(lot_id, curtime, user_responses):
    lot_fullness_float = 0
    j = 0
    for response in user_responses:
        if response.lot_id == lot_id:
            timediff = curtime - response.date_created
            #make the response become weighted less as it gets older
            if response.lot_is_full == 1:
                lot_fullness_float += 1 - (1.02 ** (-((2101 - timediff.total_seconds()) / 5)))
            j += 1
    if j > 0:
        lot_fullness_float = lot_fullness_float / j
    else:
        lot_fullness_float = 0
    return lot_fullness_float

# create endpoint
app_recommend = Blueprint('app_recommend', __name__)
@app_recommend.route('/recommend', methods=['GET'])

def recommend():
    # get parameters
    guest = False
    bearer = request.headers.get('Authorization')
    if bearer:
        userinfo = check_session(bearer.split()[1])
        if (not bearer) or (not userinfo): 
            return jsonify({'message': 'Unauthorized'}), 401
    else:
        guest = True

    schedule_id = request.args.get('schedule_id', default=0, type=int)
    building_id = request.args.get('building_id', default=0, type=int)

    curtime = request.args.get('test_date', default=datetime.now(), type=strToDate)

    # get necessary data
    
    feedback = get_user_feedback(30)
    user_permits = get_user_permits(None if guest else userinfo.user_id)
    lots = get_parking_lots(user_permits)
    destination = None

    if schedule_id:
        first_or_last_location = request.args.get('first_or_last_location', default='first', type=str)
        destination = get_destination(schedule_id=schedule_id, first_or_last_location=first_or_last_location, weekday=(curtime.weekday() + 1) % 7)
    elif building_id:
        building_id = request.args.get('building_id', default=0, type=int)
        destination = get_destination(building_id=building_id)
    else:
        return 'schedule_id or building_id is required', 400
    
    # iteratively deserialize lots into LotRecommendation object array
    for lot in lots:
        lot.feet_to_destination = get_best_distance(destination.latitude, destination.longitude, destination.latitude, destination.longitude, lot.lot_rect[0], lot.lot_rect[1], lot.lot_rect[2], lot.lot_rect[3])
        
        lot.latitude= (lot.lot_rect[0] + lot.lot_rect[2]) / 2
        lot.longitude= (lot.lot_rect[1] + lot.lot_rect[3]) / 2
        del lot.lot_rect

        lot.fullness = calc_lot_fullness_float(lot.lot_id, curtime, feedback)

    # sort lots and call the function with user not preferring vacancy just to test
    if guest:
        lots = sort_and_filter_lots(lots, 'd', True)
    else:
        lots = sort_and_filter_lots(lots, userinfo.distance_or_vacancy, userinfo.include_metered)

    return jsonify(list(map(lambda lot: lot.__dict__, lots[0:3]))), 200