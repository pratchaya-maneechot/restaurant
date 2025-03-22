package reservation

import (
	defs "apps/reservation-service/internal/application/commands/reservation/defs"
	"apps/reservation-service/internal/domain"
	"apps/reservation-service/internal/infrastructure/commandbus"
	"context"
	"errors"
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
		return nil, errors.New("invalid command type")
	}
	reservation, err := h.repo.FindByID(ctx, input.ReservationID)
	if err != nil {
		return nil, err
	}
	if err := reservation.UpdateDateTime(input.DateTime); err != nil {
		return nil, err
	}
	if err := h.repo.Save(ctx, reservation); err != nil {
		return nil, err
	}
	return reservation, nil
}
