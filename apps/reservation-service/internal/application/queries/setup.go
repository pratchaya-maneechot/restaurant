package queries

import (
	"apps/reservation-service/internal/application/queries/reservation"
	"apps/reservation-service/internal/config"
	"apps/reservation-service/internal/infrastructure/querybus"
)

type QueryBusSetup struct {
	Bus *querybus.QueryBus
}

func NewQuerySetup(
	bus *querybus.QueryBus,
	getAvailableTablesHandler *reservation.GetAvailableTablesHandler,
	getReservation *reservation.GetReservationHandler,
	getReservations *reservation.GetReservationsHandler,
) QueryBusSetup {
	bus.Register(config.GetAvailableTables, getAvailableTablesHandler)
	bus.Register(config.GetReservation, getReservation)
	bus.Register(config.GetReservations, getReservations)

	return QueryBusSetup{Bus: bus}
}
