SELECT DISTINCT
    p.lot_id,
    p.name,
    p.top_right_latitude, 
    p.top_right_longitude, 
    p.bottom_left_latitude, 
    p.bottom_left_longitude 
FROM parking_lot p
INNER JOIN parking_lot_permit_type t
    ON p.lot_id = t.lot_id
    AND t.permit_type_id = ANY(%s)
ORDER BY p.lot_id;