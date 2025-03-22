package definition

import (
	"apps/reservation-service/internal/configs"
	"time"

	"github.com/google/uuid"
)

type CreateReservationCommand struct {
	ReservationID uuid.UUID
	CustomerName  string
	TableID       string
	DateTime      time.Time
}

func (c CreateReservationCommand) Type() string {
	return configs.CreateReservation
}
