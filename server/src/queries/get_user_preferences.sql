SELECT first_or_last_location, max_walking_distance, multiple_parks
FROM plrs_user 
WHERE user_id = %s;