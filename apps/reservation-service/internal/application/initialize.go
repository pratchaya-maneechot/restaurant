//go:build wireinject
// +build wireinject

package application

import (
	"apps/reservation-service/internal/application/commands"
	reservationCmd "apps/reservation-service/internal/application/commands/reservation"
	"apps/reservation-service/internal/application/queries"
	reservationQuery "apps/reservation-service/internal/application/queries/reservation"
	"apps/reservation-service/internal/infrastructure/commandbus"
	"apps/reservation-service/internal/infrastructure/db"
	"apps/reservation-service/internal/infrastructure/querybus"
	"apps/reservation-service/internal/infrastructure/repository"

	"github.com/google/wire"
	"github.com/jackc/pgx/v5/pgxpool"
)

type App struct {
	CommandBus *commandbus.CommandBus
	QueryBus   *querybus.QueryBus
	DB         *pgxpool.Pool
}

func NewApp(cmdSetup commands.CommandBusSetup, querySetup queries.QueryBusSetup, dbConn *pgxpool.Pool) App {
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
		commands.NewCommandSetup,
		queries.NewQuerySetup,

		commandbus.NewCommandBus,
		querybus.NewQueryBus,

		NewApp,
	)
	return App{}
}
