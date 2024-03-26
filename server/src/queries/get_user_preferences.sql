SELECT first_or_last_location, distance_or_vacancy
FROM plrs_user 
WHERE user_id = %s;