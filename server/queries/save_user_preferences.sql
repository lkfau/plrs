UPDATE plrs_user 
SET first_or_last_location = B'%s',
    max_walking_distance = %s,
    multiple_parks = B'%s'
WHERE user_id = %s;