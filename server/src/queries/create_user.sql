INSERT INTO plrs_user (email, password_hash, auth_code)
SELECT %s, %s, %s
WHERE NOT EXISTS(SELECT 1 FROM plrs_user WHERE email = %s)