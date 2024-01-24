SELECT lot_id, lot_is_full, time_of_response 
FROM user_feedback 
WHERE time_of_response >= %s