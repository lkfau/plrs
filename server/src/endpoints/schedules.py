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
            self.interval = query_result[2].total_seconds()

        # case 2: create instance from front-end request (save)
        else:
            self.name = request_data['name']
            self.interval = timedelta(
                hours=request_data['interval'].get('hours', 0),
                days=request_data['interval'].get('days', 0),
                weeks=request_data['interval'].get('weeks', 0)
            ),
            self.items = []
            for item in request_data['items']:
                self.items.append(ScheduleItem(request_data=item))

# Schedule: object return type for /schedule/{id} requests
class ScheduleItem: 
    def __init__(self, request_data = None, query_result = None):
        # case 1: create instance from database (load)
        if query_result != None:       
            self.item_id = query_result[0]
            self.building_id = query_result[1]
            self.arrival_weekday = query_result[2]
            self.arrival_time = query_result[3].isoformat()
        
        # case 2: create instance from front-end request (save)
        else:
            self.building_id = request_data['building_id']
            self.arrival_weekday = request_data['arrival_weekday']
            self.arrival_time = datetime.strptime(request_data['arrival_time'], "%H:%M:%S").time()



# load user schedules
def get_schedules(user_id):
    query_result = query('get_user_schedules.sql', [user_id], "all") #get user schedules
    user_schedules = list(map(lambda schedule : Schedule(query_result=schedule), query_result))
    return user_schedules

# load items for schedule
def get_schedule_items(schedule_id):
    query_result = query('get_schedule_items.sql', [schedule_id], "all") #get schedule items
    schedule_items = list(map(lambda item : ScheduleItem(query_result=item), query_result))
    return schedule_items

# save schedule
def add_schedule(user_id, new_schedule):
    # 1. add the schedule to user_schedule
    added_schedule_id = query('add_schedule.sql', [
        user_id,
        new_schedule.name,
        new_schedule.interval
    ], 'one')[0]
    # 2. convert the schedule items to a list of tuples
    new_schedule_items = tuple(map(lambda item : (
        added_schedule_id, item.building_id, item.arrival_weekday, item.arrival_time.isoformat()
    ), new_schedule.items))
    
    # 3. add the schedule items to schedule_item
    add_schedule_items_result = query('add_schedule_items.sql', new_schedule_items, 'none', True)
    return add_schedule_items_result


def update_schedule(schedule_id, schedule):
    # 1. update the schedule name and interval
    update_schedule_result = query('update_schedule.sql', [
        schedule.name,
        schedule.interval,
        schedule_id
    ])

    # 2. convert the schedule items to a list of tuples
    schedule_items = tuple(map(lambda item : (
        schedule_id, item.building_id, item.arrival_weekday, item.arrival_time.isoformat()
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
            
             # case 1: get user's schedules
            if (user_id > 0):
                user_schedules = get_schedules(user_id)
                return jsonify(list(map(lambda schedule: schedule.__dict__, user_schedules))), 200
            
             # case 2: get items in schedule
            elif (schedule_id > 0):
                schedule_items = get_schedule_items(schedule_id)
                return jsonify(list(map(lambda item: item.__dict__, schedule_items))), 200
      
        # case 3: add new schedule
        elif request.method == 'POST':
            request_data = request.get_json()
            user_id = request_data['user_id']
            schedule = Schedule(request_data=request_data)
            add_status = add_schedule(user_id, schedule)
            if add_status:
                return 'Schedule successfully added.', 200
            else:
                return 'Schedule not found.', 404
            
        # case 4: update existing schedule
        elif request.method == 'PUT':
            request_data = request.get_json()
            schedule_id = request_data['schedule_id']
            schedule = Schedule(request_data=request_data)
            update_status = update_schedule(schedule_id, schedule)
            if update_status:
                return 'Schedule successfully updated.', 200
            else:
                return 'Schedule items failed to update.', 500 
            
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