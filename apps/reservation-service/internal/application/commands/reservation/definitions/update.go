package definitions

import (
	"apps/reservation-service/internal/domain"
	"context"
	"time"
)

type UpdateReservationCommand struct {
	ReservationID string
	DateTime      time.Time
}

func (c UpdateReservationCommand) Type() string {
	return "UpdateReservation"
}

type UpdateReservationHandler struct {
	repo domain.ReservationRepository
}

func NewUpdateReservationHandler(repo domain.ReservationRepository) *UpdateReservationHandler {
	return &UpdateReservationHandler{repo: repo}
}

func (h *UpdateReservationHandler) Handle(ctx context.Context, cmd UpdateReservationCommand) error {
	reservation, err := h.repo.FindByID(ctx, cmd.ReservationID)
	if err != nil {
		return err
	}
	reservation.DateTime = cmd.DateTime
	return h.repo.Save(ctx, reservation)
}
