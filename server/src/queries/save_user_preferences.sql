UPDATE plrs_user 
SET first_or_last_location = %s,
    distance_or_vacancy = %s
WHERE user_id = %s;