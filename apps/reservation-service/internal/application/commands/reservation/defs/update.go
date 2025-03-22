package defs

import (
	"apps/reservation-service/internal/config"
	"time"

	"github.com/google/uuid"
)

type UpdateReservationCommand struct {
	ReservationID uuid.UUID
	DateTime      time.Time
}

func (c UpdateReservationCommand) Type() string {
	return config.UpdateReservation
}
