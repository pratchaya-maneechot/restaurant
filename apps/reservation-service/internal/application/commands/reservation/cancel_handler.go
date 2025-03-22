package reservation

import (
	defs "apps/reservation-service/internal/application/commands/reservation/defs"
	"apps/reservation-service/internal/domain"
	"context"
)

type CancelReservationHandler struct {
	repo domain.ReservationRepository
}

func NewCancelReservationHandler(repo domain.ReservationRepository) *CancelReservationHandler {
	return &CancelReservationHandler{repo: repo}
}

func (h *CancelReservationHandler) Handle(ctx context.Context, cmd defs.CancelReservationCommand) (any, error) {
	reservation, err := h.repo.FindByID(ctx, cmd.ReservationID)
	if err != nil {
		return err, err
	}
	if err := reservation.Cancel(); err != nil {
		return err, err
	}
	return h.repo.Save(ctx, reservation), err
}
