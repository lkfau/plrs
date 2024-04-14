SELECT password_hash
FROM plrs_user
WHERE email = %s
    AND email_verified = TRUE;