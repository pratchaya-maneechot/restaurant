package db

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
)

func NewDBConn() *pgxpool.Pool {
	pool, err := pgxpool.New(context.Background(), "postgres://postgres:password@localhost:5432/reservation_db?sslmode=disable")
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	return pool
}
