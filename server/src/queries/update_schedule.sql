UPDATE user_schedule 
set name = %s,
    interval = %s
WHERE schedule_id = %s;