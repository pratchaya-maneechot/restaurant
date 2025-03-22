-- name: FindAvailableTables :many
SELECT table_id
FROM reservations
WHERE date_time = $1 AND status != 'cancelled'
GROUP BY table_id
HAVING COUNT(*) < 1;