//go:build wireinject
// +build wireinject

package application

import (
	command_setup "apps/reservation-service/internal/application/commands"
	command "apps/reservation-service/internal/application/commands/reservation"
	query_setup "apps/reservation-service/internal/application/queries"
	"apps/reservation-service/internal/infrastructure/command_bus"
	"apps/reservation-service/internal/infrastructure/query_bus"
	"apps/reservation-service/internal/infrastructure/repository"

	"github.com/google/wire"
)

type App struct {
	CommandBus *command_bus.CommandBus
	QueryBus   *query_bus.QueryBus
}

func NewApp(cmdSetup command_setup.CommandBusSetup, querySetup query_setup.QueryBusSetup) App {
	return App{
		CommandBus: cmdSetup.Bus,
		QueryBus:   querySetup.Bus,
	}
}

func InitializeApp() App {
	wire.Build(
		repository.ProvideReservationRepository,
		command.NewCreateReservationHandler,
		command_setup.NewCommandSetup,
		query_setup.NewQuerySetup,
		command_bus.NewCommandBus,
		query_bus.NewQueryBus,
		NewApp,
	)
	return App{}
}
