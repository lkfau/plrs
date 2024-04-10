UPDATE plrs_user
SET email = %s, email_verified = false
WHERE user_id = %s;