SELECT i.item_id, i.schedule_id, i.building_id, i.arrival_weekdays, i.arrival_time
FROM schedule_item i
INNER JOIN user_schedule s ON s.schedule_id = i.schedule_id
WHERE i.schedule_id = COALESCE(%s, -1)
OR s.user_id = COALESCE(%s, -1);