//go:build wireinject
// +build wireinject

package application

import (
	command_setup "apps/reservation-service/internal/application/commands"
	reservationCmd "apps/reservation-service/internal/application/commands/reservation"
	query_setup "apps/reservation-service/internal/application/queries"
	reservationQuery "apps/reservation-service/internal/application/queries/reservation"
	"apps/reservation-service/internal/infrastructure/command_bus"
	"apps/reservation-service/internal/infrastructure/db"
	"apps/reservation-service/internal/infrastructure/query_bus"
	"apps/reservation-service/internal/infrastructure/repository"

	"github.com/google/wire"
	"github.com/jackc/pgx/v5/pgxpool"
)

type App struct {
	CommandBus *command_bus.CommandBus
	QueryBus   *query_bus.QueryBus
	DB         *pgxpool.Pool
}

func NewApp(cmdSetup command_setup.CommandBusSetup, querySetup query_setup.QueryBusSetup, dbConn *pgxpool.Pool) App {
	return App{
		CommandBus: cmdSetup.Bus,
		QueryBus:   querySetup.Bus,
		DB:         dbConn,
	}
}

func InitializeApp() App {
	wire.Build(
		//connection 3rd-party
		db.NewDBConn,
		//repository implement
		repository.NewReservationRepository,
		//command handler
		reservationCmd.NewCreateReservationHandler,
		//query handler
		reservationQuery.NewGetReservationHandler,
		//setup
		command_setup.NewCommandSetup,
		query_setup.NewQuerySetup,

		command_bus.NewCommandBus,
		query_bus.NewQueryBus,

		NewApp,
	)
	return App{}
}
