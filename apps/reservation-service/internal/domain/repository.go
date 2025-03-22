package domain

import (
	"context"
	"time"

	"github.com/google/uuid"
)

type ReservationRepository interface {
	Save(ctx context.Context, reservation *Reservation) error
	FindByID(ctx context.Context, id uuid.UUID) (*Reservation, error)
	FindAll(ctx context.Context) ([]*Reservation, error)
	FindAvailableTables(ctx context.Context, dateTime time.Time) ([]string, error)
}
