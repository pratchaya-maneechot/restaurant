package queries

import (
	"apps/reservation-service/internal/application/queries/reservation"
	"apps/reservation-service/internal/config"
	"apps/reservation-service/internal/infrastructure/querybus"
)

type QueryBusSetup struct {
	Bus *querybus.QueryBus
}

func NewQuerySetup(bus *querybus.QueryBus, getReservation *reservation.GetReservationHandler) QueryBusSetup {
	bus.Register(config.GetReservation, getReservation)
	return QueryBusSetup{Bus: bus}
}
