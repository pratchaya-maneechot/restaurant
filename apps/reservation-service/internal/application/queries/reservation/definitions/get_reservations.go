package definition

import "apps/reservation-service/internal/configs"

type GetReservationsQuery struct{}

func (q GetReservationsQuery) Type() string {
	return configs.GetReservations
}
