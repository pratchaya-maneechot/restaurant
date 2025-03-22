package defs

import (
	"apps/reservation-service/internal/config"

	"github.com/google/uuid"
)

type CancelReservationCommand struct {
	ReservationID uuid.UUID
}

func (c CancelReservationCommand) Type() string {
	return config.CancelReservation
}
