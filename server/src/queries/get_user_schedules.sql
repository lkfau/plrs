SELECT s.schedule_id, s.name
FROM user_schedule s
INNER JOIN schedule_item i
  ON (i.schedule_id = s.schedule_id)
WHERE user_id = %s
  AND i.arrival_weekdays & COALESCE(%s, i.arrival_weekdays) <> 0
GROUP BY s.schedule_id, s.name