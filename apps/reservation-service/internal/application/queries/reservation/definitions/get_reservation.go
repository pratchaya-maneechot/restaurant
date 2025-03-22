package definition

import "apps/reservation-service/internal/configs"

type GetReservationQuery struct {
	ReservationID string
}

func (q GetReservationQuery) Type() string {
	return configs.GetReservation
}
