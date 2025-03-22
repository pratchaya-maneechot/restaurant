package definition

import (
	"apps/reservation-service/internal/configs"
	"time"
)

type UpdateReservationCommand struct {
	ReservationID string
	DateTime      time.Time
}

func (c UpdateReservationCommand) Type() string {
	return configs.UpdateReservation
}
