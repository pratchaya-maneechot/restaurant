package definition

import (
	"time"
)

type UpdateReservationCommand struct {
	ReservationID string
	DateTime      time.Time
}

func (c UpdateReservationCommand) Type() string {
	return "UpdateReservation"
}
