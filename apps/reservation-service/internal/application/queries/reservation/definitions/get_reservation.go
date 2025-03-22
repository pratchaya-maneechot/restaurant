package definition

import (
	"apps/reservation-service/internal/configs"

	"github.com/google/uuid"
)

type GetReservationQuery struct {
	ReservationID uuid.UUID
}

func (q GetReservationQuery) Type() string {
	return configs.GetReservation
}
