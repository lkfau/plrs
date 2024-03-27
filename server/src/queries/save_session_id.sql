UPDATE plrs_user
SET
    current_session_id = %s,
    last_session_id_time = %s
WHERE
    email = %s
    AND password_hash = %s;