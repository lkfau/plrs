SELECT p.permit_type_id, p.type_name, CASE
  WHEN u.user_id IS NOT NULL THEN TRUE
  ELSE FALSE
END AS user_has_permit
FROM permit_type p
LEFT JOIN user_permit_type u ON u.permit_type_id = p.permit_type_id
WHERE p.permit_required = TRUE
AND (u.user_id IS NULL OR u.user_id = %s)
ORDER BY p.permit_type_id;