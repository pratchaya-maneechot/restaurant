package definition

import (
	"apps/reservation-service/internal/configs"
	"time"
)

type CreateReservationCommand struct {
	ReservationID string
	CustomerName  string
	TableID       string
	DateTime      time.Time
}

func (c CreateReservationCommand) Type() string {
	return configs.CreateReservation
}
