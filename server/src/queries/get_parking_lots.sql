SELECT DISTINCT
    p.lot_id,
    p.name,
    t.payment_required,
    p.top_right_latitude, 
    p.top_right_longitude, 
    p.bottom_left_latitude, 
    p.bottom_left_longitude
FROM parking_lot p
INNER JOIN LATERAL (
    SELECT CASE 
      WHEN COUNT(*) = 1 AND SUM(CASE WHEN t.metered = TRUE THEN 1 END) = 1 THEN 1 
      ELSE 0 
    END AS payment_required
    FROM parking_lot_permit_type l
    INNER JOIN permit_type t
        ON (t.permit_type_id = l.permit_type_id)
    WHERE l.lot_id = p.lot_id
    AND l.permit_type_id = ANY(%s)
    GROUP BY l.lot_id
) AS t ON TRUE
ORDER BY p.lot_id;