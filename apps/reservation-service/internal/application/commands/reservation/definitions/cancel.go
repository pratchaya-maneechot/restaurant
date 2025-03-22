package definition

import "apps/reservation-service/internal/configs"

type CancelReservationCommand struct {
	ReservationID string
}

func (c CancelReservationCommand) Type() string {
	return configs.CancelReservation
}
