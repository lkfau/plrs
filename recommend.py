import math
from flask import request, Blueprint

from db_connection import run_query

# LotRecommendation: object return type for /recommend requests
class LotRecommendation:
    def __init__(self, lot_id, lot_name, feetToDestination):
        self.lot_id = lot_id
        self.lot_name = lot_name
        self.feetToDestination = feetToDestination

# distance(): returns distance between points (x1, y1) and (x2, y2)
def distance(x1, y1, x2, y2):
    distance = math.sqrt(((x2-x1)**2)+ ((y2-y1)**2))
    return distance

# get-best_distance(): returns closest distance between (dest_x, dest_y) 
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
    return min(distances) * 364500 

# create endpoint
app_recommend = Blueprint('app_recommend', __name__)
@app_recommend.route('/recommend', methods=['GET'])

def recommend():
    # get parameters
    building_id = request.args.get('building_id', default=0, type=int)
    permit_type_id = request.args.get('permit_type_id', default=0, type=int)

    # get necessary data
    lots_result = run_query('get_parking_lots.sql', [permit_type_id], True) #get parking lots
    destination_result = run_query('get_destination.sql', [building_id], False) #get destination buliding

    # iteratively deserialize lots into LotRecommendation object array
    lots_result = list(map(lambda lot : LotRecommendation(
        lot_id=lot[0], 
        lot_name=lot[1], 
        feetToDestination=get_best_distance(destination_result[1],  destination_result[2], lot[2:6])
    ), lots_result))

    # sort lots by distance to building
    lots_result.sort(key = lambda lot : lot.feetToDestination)

    # return top 3 results
    return list(map(lambda lot: lot.__dict__, lots_result[0:3]))