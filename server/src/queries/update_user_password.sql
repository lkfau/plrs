UPDATE plrs_user
SET password_hash = %s
WHERE password_hash = %s
    AND user_id = %s