package query_setup

import (
	"apps/reservation-service/internal/infrastructure/query_bus"
)

type QueryBusSetup struct {
	Bus *query_bus.QueryBus
}

func NewQuerySetup(bus *query_bus.QueryBus) QueryBusSetup {
	return QueryBusSetup{Bus: bus}
}
