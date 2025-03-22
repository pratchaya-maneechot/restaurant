package commands

import (
	"apps/reservation-service/internal/application/commands/reservation"
	"apps/reservation-service/internal/config"
	"apps/reservation-service/internal/infrastructure/commandbus"
)

type CommandBusSetup struct {
	Bus *commandbus.CommandBus
}

func NewCommandSetup(
	bus *commandbus.CommandBus,
	createReservation *reservation.CreateReservationHandler,
	updateReservation *reservation.UpdateReservationHandler,
	cancelReservation *reservation.CancelReservationHandler,
) CommandBusSetup {
	bus.Register(config.CreateReservation, createReservation)
	bus.Register(config.UpdateReservation, updateReservation)
	bus.Register(config.CancelReservation, cancelReservation)

	return CommandBusSetup{Bus: bus}
}
