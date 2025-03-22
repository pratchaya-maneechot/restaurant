package reservation

import (
	defs "apps/reservation-service/internal/application/commands/reservation/defs"
	"apps/reservation-service/internal/domain"
	"apps/reservation-service/internal/infrastructure/commandbus"
	"context"
	"errors"

	"github.com/google/uuid"
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
		return nil, errors.New("invalid command type")
	}
	reservation, err := domain.NewReservation(uuid.New(), input.CustomerName, input.TableID, input.DateTime)
	if err != nil {
		return nil, err
	}
	if err := h.repo.Save(ctx, reservation); err != nil {
		return nil, err
	}
	return reservation, nil
}
