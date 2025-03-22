package reservation

import (
	defs "apps/reservation-service/internal/application/commands/reservation/defs"
	"apps/reservation-service/internal/domain"
	"apps/reservation-service/internal/infrastructure/commandbus"
	"context"
	"fmt"
)

type UpdateReservationHandler struct {
	repo domain.ReservationRepository
}

func NewUpdateReservationHandler(repo domain.ReservationRepository) *UpdateReservationHandler {
	return &UpdateReservationHandler{repo: repo}
}

func (h *UpdateReservationHandler) Handle(ctx context.Context, cmd commandbus.Command) (any, error) {
	input, ok := cmd.(defs.UpdateReservationCommand)
	if !ok {
		return nil, fmt.Errorf("invalid command type: expected UpdateReservationCommand, got %T", cmd)
	}
	reservation, err := h.repo.FindByID(ctx, input.ReservationID)
	if err != nil {
		return err, err
	}
	reservation.DateTime = input.DateTime
	return h.repo.Save(ctx, reservation), err
}
