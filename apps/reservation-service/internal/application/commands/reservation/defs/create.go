package defs

import (
	"apps/reservation-service/internal/config"
	"time"

	"github.com/google/uuid"
)

type CreateReservationCommand struct {
	ReservationID uuid.UUID
	CustomerName  string
	TableID       string
	DateTime      time.Time
}

func (c CreateReservationCommand) Type() string {
	return config.CreateReservation
}
