SELECT p.permit_type_id, p.type_name, p.badge_color, CASE
  WHEN u.user_id IS NOT NULL THEN TRUE
  ELSE FALSE
END AS user_has_permit
FROM permit_type p
LEFT JOIN LATERAL (
    SELECT user_id, permit_type_id
    FROM user_permit_type
    WHERE permit_type_id = p.permit_type_id
    AND user_id = %s
) AS u ON TRUE
WHERE p.permit_required = TRUE
ORDER BY p.permit_type_id;
