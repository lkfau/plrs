--Update user preference
UPDATE plrs_user u
SET first_or_last_location = CASE
  WHEN %s = 'last' THEN TRUE
  ELSE FALSE
END
FROM user_schedule s
WHERE s.user_id = u.user_id
AND s.schedule_id = %s;

--Pull building
SELECT b.building_id, b.name, b.latitude, b.longitude
FROM schedule_item i
INNER JOIN building b ON b.building_id = i.building_id
INNER JOIN user_schedule s ON s.schedule_id = i.schedule_id
INNER JOIN plrs_user u ON u.user_id = s.user_id
WHERE i.schedule_id = %s
    AND i.arrival_weekdays & %s <> 0
ORDER BY 
CASE WHEN u.first_or_last_location THEN i.arrival_time END DESC, 
CASE WHEN NOT u.first_or_last_location THEN i.arrival_time END ASC
LIMIT 1;
    