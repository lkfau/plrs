SELECT p.permit_type_id
FROM  permit_type p
LEFT JOIN user_permit_type u ON u.permit_type_id = p.permit_type_id
WHERE u.user_id = %s
OR p.permit_required = FALSE
ORDER BY permit_type_id