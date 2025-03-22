package reservation

import (
	defs "apps/reservation-service/internal/application/commands/reservation/defs"
	"apps/reservation-service/internal/domain"
	"apps/reservation-service/internal/infrastructure/commandbus"
	"context"
	"fmt"
)

type CreateReservationHandler struct {
	repo domain.ReservationRepository
}

func NewCreateReservationHandler(repo domain.ReservationRepository) *CreateReservationHandler {
	return &CreateReservationHandler{repo: repo}
}

func (h *CreateReservationHandler) Handle(ctx context.Context, cmd commandbus.Command) (any, error) {
	input, ok := cmd.(defs.CreateReservationCommand)
	if !ok {
		return nil, fmt.Errorf("invalid command type: expected CreateReservationCommand, got %T", cmd)
	}
	reservation, err := domain.NewReservation(input.ReservationID, input.CustomerName, input.TableID, input.DateTime)
	if err != nil {
		return nil, err
	}
	return input.ReservationID, h.repo.Save(ctx, reservation)
}
