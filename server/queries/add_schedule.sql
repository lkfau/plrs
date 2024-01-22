INSERT INTO user_schedule (user_id, name, interval) 
VALUES (%s, %s, %s) 
RETURNING schedule_id;