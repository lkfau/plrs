from flask import Blueprint, jsonify
from flask_cors import cross_origin
from ..database.db_connection import run_query as query

# ParkingLot: object return type for /recommend requests
class Building:
    def __init__(self, query_result):
        self.building_id = query_result[0]
        self.building_name = query_result[1]
        if (len(query_result) > 2):
            self.latitude = query_result[2]
            self.longitude = query_result[3]

def get_buildings():
        query_result = query('get_buildings.sql', [], "all")
        buildings = list(map(lambda building : Building(query_result=building), query_result))
        return buildings

def get_destination(building_id = None, schedule_id = None, first_or_last_location = None, weekday = None):
        if schedule_id != None:
            query_result = query('get_destination_from_schedule.sql', [
                first_or_last_location == 'last',
                schedule_id,
                int(pow(2, weekday))
            ], "one")
        else:
            query_result = query('get_destination_from_building.sql', [building_id], "one")
        building = Building(query_result=query_result)
        print(building.building_name)
        return building
        
# create endpoint
app_buildings = Blueprint('app_buildings', __name__)
@app_buildings.route('/buildings', methods=['GET'])
@cross_origin()

def buildings():
    try:
        buildings = get_buildings()
        return jsonify(list(map(lambda building: building.__dict__, buildings))), 200
    
    except Exception as error:
        print('ERROR', error)
        return 'Server error', 500