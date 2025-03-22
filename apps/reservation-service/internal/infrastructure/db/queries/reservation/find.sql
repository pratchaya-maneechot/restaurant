-- name: FindReservationByID :one
SELECT id, customer_name, table_id, date_time, status, created_at
FROM reservations
WHERE id = $1;

-- name: FindAllReservations :many
SELECT id, customer_name, table_id, date_time, status, created_at
FROM reservations
ORDER BY created_at DESC;