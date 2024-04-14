UPDATE plrs_user
SET auth_code = NULL, email_verified = TRUE
WHERE user_id = %s
    AND auth_code IS NOT NULL 
    AND email_verified = FALSE
    AND auth_code = %s;