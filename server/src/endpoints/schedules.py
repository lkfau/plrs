from datetime import datetime, time, timedelta
from flask import request, Blueprint, jsonify
from ..database.db_connection import run_query as query

# Schedule: object return type for /schedule requests
class Schedule:
    def __init__(self, query_result = None, request_data = None):
        # case 1: create instance from database (load)
        if query_result != None:
            self.schedule_id = query_result[0]
            self.name = query_result[1]

        # case 2: create instance from front-end request (save)
        else:
            self.name = request_data['name']
            self.items = []
            for item in request_data['items']:
                self.items.append(ScheduleItem(request_data=item))
    
    def to_dict(self):
        return {
            'schedule_id': self.schedule_id,
            'name': self.name,
            'items': list(map(lambda item : {
                'item_id': item.item_id,
                'schedule_id': item.schedule_id,
                'building_id': item.building_id,
                'arrival_weekdays': item.arrival_weekdays,
                'arrival_time': item.arrival_time
            }, self.items))
        }

# Schedule: object return type for /schedule/{id} requests
class ScheduleItem: 
    def __init__(self, request_data = None, query_result = None):
        # case 1: create instance from database (load)
        if query_result != None:       
            self.item_id = query_result[0]
            self.schedule_id = query_result[1]
            self.building_id = query_result[2]
            self.arrival_weekdays = bitmask_to_array(query_result[3])
            self.arrival_time = query_result[4].isoformat()
        
        # case 2: create instance from front-end request (save)
        else:
            self.building_id = request_data['building_id']
            self.arrival_weekdays = array_to_bitmask(request_data['arrival_weekdays'])
            self.arrival_time = datetime.strptime(request_data['arrival_time'], "%H:%M:%S").time()

def array_to_bitmask(weekdays):
    result = 0
    for day in weekdays :
        result += 2**day
    return result

def bitmask_to_array(weekdays):
    result = []
    i = 0
    while weekdays > 0:
        if weekdays % (2**(i+1)) != 0:
            result.append(i)
            weekdays -= weekdays % (2**(i+1))
        i += 1
    return result
            
# load user schedules
def get_schedules(user_id):
    query_result = query('get_user_schedules.sql', [user_id], "all") #get user schedules
    user_schedules = list(map(lambda schedule : Schedule(query_result=schedule), query_result))
    return user_schedules

# load user schedules with items
def get_schedules_with_items(user_id):
    user_schedules = get_schedules(user_id)
    schedule_items = get_schedule_items(user_id=user_id)
    for schedule in user_schedules:
        schedule.items = list(filter(lambda item : item.schedule_id == schedule.schedule_id, schedule_items))
    return user_schedules

# load items for schedule
def get_schedule_items(schedule_id = None, user_id = None):
    query_result = query('get_schedule_items.sql', [schedule_id, user_id], "all") #get schedule items
    schedule_items = list(map(lambda item : ScheduleItem(query_result=item), query_result))
    return schedule_items

# save schedule
def add_schedule(user_id, new_schedule):
    # 1. add the schedule to user_schedule
    added_schedule_id = query('add_schedule.sql', [
        user_id,
        new_schedule.name
    ], 'one')[0]
    
    # 2. convert the schedule items to a list of tuples
    new_schedule_items = tuple(map(lambda item : (
        added_schedule_id, item.building_id, item.arrival_weekdays, item.arrival_time.isoformat()
    ), new_schedule.items))
    
    # 3. add the schedule items to schedule_item
    add_schedule_items_result = query('add_schedule_items.sql', new_schedule_items, 'none', True)
    return added_schedule_id if add_schedule_items_result else None

def update_schedule(schedule_id, schedule):
    # 1. update the schedule
    update_schedule_result = query('update_schedule.sql', [
        schedule.name,
        schedule_id
    ])

    # 2. convert the schedule items to a list of tuples
    schedule_items = tuple(map(lambda item : (
        schedule_id, item.building_id, item.arrival_weekdays, item.arrival_time.isoformat()
    ), schedule.items))

    # 3. remove all current schedule items
    delete_schedule_items_result = query('delete_schedule_items.sql', [schedule_id])

    # 4. add the new schedule items to schedule_item
    add_schedule_items_result = query('add_schedule_items.sql', schedule_items, 'none', True)
    return update_schedule_result and delete_schedule_items_result and add_schedule_items_result

def delete_schedule(schedule_id):
    # delete the schedule
    delete_schedule_result = query('delete_schedule.sql', [schedule_id, schedule_id])
    return delete_schedule_result

# create endpoint
app_schedules = Blueprint('app_schedules', __name__)

# add routes
@app_schedules.route('/schedules', methods=['GET', 'POST', 'PUT', 'DELETE'])

# /schedules
def schedules():
    try:
        if request.method == 'GET':
            user_id = request.args.get('user_id', default=0, type=int)
            schedule_id = request.args.get('schedule_id', default=0, type=int)
            get_items = request.args.get('get_items', default=0, type=bool)
             # case 1: get user's schedules
            if (user_id > 0 and get_items == False):
                user_schedules = get_schedules(user_id)
                return jsonify(list(map(lambda schedule: schedule.__dict__, user_schedules))), 200
            
            # case 2: get schedules with items
            elif (user_id > 0 and get_items == True):
                user_schedules = get_schedules_with_items(user_id)
                return jsonify(list(map(lambda schedule : schedule.to_dict(), user_schedules))), 200

             # case 2: get items in schedule
            elif (schedule_id > 0):
                schedule_items = get_schedule_items(schedule_id=schedule_id)
                return jsonify(list(map(lambda item: item.__dict__, schedule_items))), 200
      
        # case 3: add new schedule
        elif request.method == 'POST':
            request_data = request.get_json()
            user_id = request_data['user_id']
            schedule = Schedule(request_data=request_data)
            added_schedule_id = add_schedule(user_id, schedule)
            if added_schedule_id:
                return 'Schedule successfully added.', 200
            else:
                return 'Schedule add failed.', 500
            
        # case 4: update existing schedule
        elif request.method == 'PUT':
            request_data = request.get_json()
            schedule_id = request_data['schedule_id']
            schedule = Schedule(request_data=request_data)
            update_status = update_schedule(schedule_id, schedule)
            if update_status:
                return 'Schedule successfully updated.', 200
            else:
                return 'Schedule update failed.', 500 
            
        # case 5: delete existing schedule
        elif request.method == 'DELETE':
            schedule_id = request.args.get('schedule_id', default=0, type=int)
            delete_status = delete_schedule(schedule_id)
            if delete_status:
                return 'Schedule successfully deleted.', 200
            else:
                return 'Schedule not found.', 404
        
        
        else:
            return 'Unsupported request method.', 405
        
    except Exception as error:
        print('Server error: ', error)
        return 'Server error', 500