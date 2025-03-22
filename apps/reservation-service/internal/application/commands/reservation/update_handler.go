package reservation

import (
	defs "apps/reservation-service/internal/application/commands/reservation/defs"
	"apps/reservation-service/internal/domain"
	"context"
)

type UpdateReservationHandler struct {
	repo domain.ReservationRepository
}

func NewUpdateReservationHandler(repo domain.ReservationRepository) *UpdateReservationHandler {
	return &UpdateReservationHandler{repo: repo}
}

func (h *UpdateReservationHandler) Handle(ctx context.Context, cmd defs.UpdateReservationCommand) error {
	reservation, err := h.repo.FindByID(ctx, cmd.ReservationID)
	if err != nil {
		return err
	}
	reservation.DateTime = cmd.DateTime
	return h.repo.Save(ctx, reservation)
}
