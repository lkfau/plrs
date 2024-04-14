DELETE FROM plrs_user
WHERE current_session_id = %s
    AND email_verified = FALSE;