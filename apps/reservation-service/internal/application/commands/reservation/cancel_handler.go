package reservation

import (
	defs "apps/reservation-service/internal/application/commands/reservation/defs"
	"apps/reservation-service/internal/domain"
	"apps/reservation-service/internal/infrastructure/commandbus"
	"context"
	"fmt"
)

type CancelReservationHandler struct {
	repo domain.ReservationRepository
}

func NewCancelReservationHandler(repo domain.ReservationRepository) *CancelReservationHandler {
	return &CancelReservationHandler{repo: repo}
}

func (h *CancelReservationHandler) Handle(ctx context.Context, cmd commandbus.Command) (any, error) {
	input, ok := cmd.(defs.CancelReservationCommand)
	if !ok {
		return nil, fmt.Errorf("invalid command type: expected CancelReservationCommand, got %T", cmd)
	}
	reservation, err := h.repo.FindByID(ctx, input.ReservationID)
	if err != nil {
		return err, err
	}
	if err := reservation.Cancel(); err != nil {
		return err, err
	}
	return h.repo.Save(ctx, reservation), err
}
