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

func (h *CancelReservationHandler) Handle(ctx context.Context, cmd defs.CancelReservationCommand) error {
	reservation, err := h.repo.FindByID(ctx, cmd.ReservationID)
	if err != nil {
		return err
	}
	if err := reservation.Cancel(); err != nil {
		return err
	}
	return h.repo.Save(ctx, reservation)
}
