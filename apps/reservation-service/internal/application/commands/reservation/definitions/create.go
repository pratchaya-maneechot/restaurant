package definition

import (
	"time"
)

type CreateReservationCommand struct {
	ReservationID string
	CustomerName  string
	TableID       string
	DateTime      time.Time
}

func (c CreateReservationCommand) Type() string {
	return "CreateReservation"
}
