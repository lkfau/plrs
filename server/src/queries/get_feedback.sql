SELECT lot_id, lot_is_full, date_created 
FROM user_feedback 
WHERE date_created >= CURRENT_TIMESTAMP - INTERVAL '%s minutes'
AND date_created <= CURRENT_TIMESTAMP;