UPDATE plrs_user
SET
    current_session_id = %s,
    last_session_id_time = %s
WHERE
    password_hash = %s;