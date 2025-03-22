package definition

import (
	"apps/reservation-service/internal/configs"

	"github.com/google/uuid"
)

type CancelReservationCommand struct {
	ReservationID uuid.UUID
}

func (c CancelReservationCommand) Type() string {
	return configs.CancelReservation
}
