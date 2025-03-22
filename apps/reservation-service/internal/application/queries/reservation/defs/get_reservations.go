package defs

import "apps/reservation-service/internal/config"

type GetReservationsQuery struct{}

func (q GetReservationsQuery) Type() string {
	return config.GetReservations
}
