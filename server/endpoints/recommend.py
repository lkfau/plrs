import math
from datetime import datetime
#from feedback import get_user_feedback
from ..database.db_connection import run_query as query
from flask import request, Blueprint


# LotRecommendation: object return type for /recommend requests
class LotRecommendation:
    def __init__(self, lot_id, lot_name, feetToDestination, fullness):
        self.lot_id = lot_id
        self.lot_name = lot_name
        self.feetToDestination = feetToDestination
        self.fullness = fullness

class userProfile:
    def __init__(self, permits, user_prefers_vacancy, name):
        self.permits = permits
        self.user_prefers_vacancy = user_prefers_vacancy
        self.name = name

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
    lots.sort(key = lambda lot : lot.feetToDestination)

    for i in range(len(lots)):
        if user_prefers_vacancy == 1 and lots[i].fullness > 0.5:
            del lots[i]
        elif lots[i].fullness > 0.6:
            del lots[i]

    return lots

def calc_lot_fullness_float(lot_id):
    user_responses = get_user_feedback(30) #grab all user responses that came in the last 30 minutes
    lot_fullness_float = 0
    i = 0
    curtime = datetime.now()
    for response in user_responses:
        if response[0] == lot_id:
            timediff = curtime - response[2]
            #make the response become weighted less as it gets older
            if timediff.total_seconds() < 5 * 60:
                lot_fullness_float += response[1]
            elif timediff.total_seconds() > 5 * 60 and timediff.total_seconds() < 10 * 60:
                lot_fullness_float += response[1] / 1.25
            elif timediff.total_seconds() > 10 * 60 and timediff.total_seconds() < 15 * 60:
                lot_fullness_float += response[1] / 1.5
            elif timediff.total_seconds() > 15 * 60 and timediff.total_seconds() < 25 * 60:
                lot_fullness_float += response[1] / 1.75
            elif timediff.total_seconds() > 25 * 60:
                lot_fullness_float += response[1] / 2
            i += 1
    lot_fullness_float = lot_fullness_float / i 
    return lot_fullness_float



# create endpoint
app_recommend = Blueprint('app_recommend', __name__)
@app_recommend.route('/recommend', methods=['GET'])

def recommend():
    # get parameters
    building_id = request.args.get('building_id', default=0, type=int)
    permit_type_id = request.args.get('permit_type_id', default=0, type=int)

    # get necessary data
    lots_result = query('get_parking_lots.sql', [permit_type_id], "all") #get parking lots
    destination_result = query('get_destination.sql', [building_id], "one") #get destination buliding

    # iteratively deserialize lots into LotRecommendation object array
    lots_result = list(map(lambda lot : LotRecommendation(
        lot_id=lot[0], 
        lot_name=lot[1], 
        feetToDestination=get_best_distance(destination_result[1],  destination_result[2], lot[2:6]),
        fullness=calc_lot_fullness_float(lot[0])
    ), lots_result))

    #sort lots and call the function with user not preferring vacancy just to test
    lots_result = sort_lots(lots_result, 0)
    # return top 3 results
    return list(map(lambda lot: lot.__dict__, lots_result[0:3]))