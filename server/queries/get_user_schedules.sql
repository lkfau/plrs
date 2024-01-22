SELECT schedule_id, name, interval
FROM user_schedule
WHERE user_id = %s;