package command_setup

import (
	command "apps/reservation-service/internal/application/commands/reservation"
	"apps/reservation-service/internal/infrastructure/command_bus"
)

type CommandBusSetup struct {
	Bus *command_bus.CommandBus
}

func NewCommandSetup(bus *command_bus.CommandBus, createReservation *command.CreateReservationHandler) CommandBusSetup {
	bus.Register("CreateReservation", createReservation)
	return CommandBusSetup{Bus: bus}
}
