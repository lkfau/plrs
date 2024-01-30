SELECT DISTINCT
    p.lot_id,
    p.name,
    p.top_right_latitude, 
    p.top_right_longitude, 
    p.bottom_left_latitude, 
    p.bottom_left_longitude 
FROM parking_lot p
INNER JOIN parking_lot_permit_type t
    ON p.lot_id = t.parking_lot_id
    AND %s IN (t.permit_type_id, 0)
ORDER BY p.lot_id;