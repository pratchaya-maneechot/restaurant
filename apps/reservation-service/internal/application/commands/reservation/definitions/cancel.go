package definitions

import (
	"apps/reservation-service/internal/domain"
	"context"
)

type CancelReservationCommand struct {
	ReservationID string
}

func (c CancelReservationCommand) Type() string {
	return "CancelReservation"
}

type CancelReservationHandler struct {
	repo domain.ReservationRepository
}

func NewCancelReservationHandler(repo domain.ReservationRepository) *CancelReservationHandler {
	return &CancelReservationHandler{repo: repo}
}

func (h *CancelReservationHandler) Handle(ctx context.Context, cmd CancelReservationCommand) error {
	reservation, err := h.repo.FindByID(ctx, cmd.ReservationID)
	if err != nil {
		return err
	}
	if err := reservation.Cancel(); err != nil {
		return err
	}
	return h.repo.Save(ctx, reservation)
}
