package defs

import (
	"apps/reservation-service/internal/config"

	"github.com/google/uuid"
)

type GetReservationQuery struct {
	ReservationID uuid.UUID
}

func (q GetReservationQuery) Type() string {
	return config.GetReservation
}
