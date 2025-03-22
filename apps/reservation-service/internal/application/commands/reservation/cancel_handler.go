package reservation

import (
	defs "apps/reservation-service/internal/application/commands/reservation/defs"
	"apps/reservation-service/internal/domain"
	"apps/reservation-service/internal/infrastructure/commandbus"
	"context"
	"errors"
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
		return nil, errors.New("invalid command type")
	}
	reservation, err := h.repo.FindByID(ctx, input.ReservationID)
	if err != nil {
		return nil, err
	}
	if err := reservation.Cancel(); err != nil {
		return nil, err
	}
	if err := h.repo.Save(ctx, reservation); err != nil {
		return nil, err
	}
	return nil, nil
}
