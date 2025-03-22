-- name: SaveReservation :one
INSERT INTO reservations (id, customer_name, table_id, date_time, status, created_at)
VALUES ($1, $2, $3, $4, $5, NOW())
RETURNING id, customer_name, table_id, date_time, status, created_at;