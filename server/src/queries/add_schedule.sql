INSERT INTO user_schedule (user_id, name) 
VALUES (%s, %s) 
RETURNING schedule_id;