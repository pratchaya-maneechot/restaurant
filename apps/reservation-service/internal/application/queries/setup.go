package query_setup

import (
	query "apps/reservation-service/internal/application/queries/reservation"
	"apps/reservation-service/internal/configs"
	"apps/reservation-service/internal/infrastructure/query_bus"
)

type QueryBusSetup struct {
	Bus *query_bus.QueryBus
}

func NewQuerySetup(bus *query_bus.QueryBus, getReservation *query.GetReservationHandler) QueryBusSetup {
	bus.Register(configs.GetReservation, getReservation)
	return QueryBusSetup{Bus: bus}
}
