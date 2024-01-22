from flask import request, Blueprint, jsonify
from flask_cors import cross_origin
from ..database.db_connection import run_query as query

# ParkingLot: object return type for /recommend requests
class Building:
    def __init__(self, query_result):
        self.building_id = query_result[0]
        self.building_name = query_result[1]

# create endpoint
app_buildings = Blueprint('app_buildings', __name__)
@app_buildings.route('/buildings', methods=['GET'])
@cross_origin()

def buildings():
    try:
        # get building data
        query_result = query('get_buildings.sql', [0], "all")

        # iteratively deserialize buildings into class array
        buildings = list(map(lambda building : Building(query_result=building), query_result))

        # return results
        return jsonify(list(map(lambda building: building.__dict__, buildings))), 200
    
    except Exception as error:
        print(error)
        return 'Server error', 500