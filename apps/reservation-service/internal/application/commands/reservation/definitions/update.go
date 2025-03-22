package definition

import (
	"apps/reservation-service/internal/configs"
	"time"

	"github.com/google/uuid"
)

type UpdateReservationCommand struct {
	ReservationID uuid.UUID
	DateTime      time.Time
}

func (c UpdateReservationCommand) Type() string {
	return configs.UpdateReservation
}
