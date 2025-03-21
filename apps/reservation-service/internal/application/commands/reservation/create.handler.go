package command

import (
	definition "apps/reservation-service/internal/application/commands/reservation/definitions"
	"apps/reservation-service/internal/domain"
	"apps/reservation-service/internal/infrastructure/command_bus"
	"context"
	"fmt"
)

type CreateReservationHandler struct {
	repo domain.ReservationRepository
}

func NewCreateReservationHandler(repo domain.ReservationRepository) *CreateReservationHandler {
	return &CreateReservationHandler{repo: repo}
}

func (h *CreateReservationHandler) Handle(ctx context.Context, cmd command_bus.Command) error {
	input, ok := cmd.(definition.CreateReservationCommand)
	if !ok {
		return fmt.Errorf("invalid command type: expected CreateReservationCommand, got %T", cmd)
	}
	reservation, err := domain.NewReservation(input.ReservationID, input.CustomerName, input.TableID, input.DateTime)
	if err != nil {
		return err
	}
	return h.repo.Save(ctx, reservation)
}
