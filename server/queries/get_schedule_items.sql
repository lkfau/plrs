SELECT item_id, building_id, arrival_weekday, arrival_time
FROM schedule_item
WHERE schedule_id = %s;