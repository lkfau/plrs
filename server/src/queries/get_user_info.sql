SELECT user_id, email_verified, distance_or_vacancy, last_schedule_id, first_or_last_location
FROM plrs_user
WHERE current_session_id = %s
    AND email_verified = %s;