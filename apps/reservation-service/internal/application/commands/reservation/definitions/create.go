package definitions

import (
	"apps/reservation-service/internal/domain"
	"context"
	"time"
)

type CreateReservationCommand struct {
	ReservationID string
	CustomerName  string
	TableID       string
	DateTime      time.Time
}

func (c CreateReservationCommand) Type() string {
	return "CreateReservation"
}

type CreateReservationHandler struct {
	repo domain.ReservationRepository
}

func NewCreateReservationHandler(repo domain.ReservationRepository) *CreateReservationHandler {
	return &CreateReservationHandler{repo: repo}
}

func (h *CreateReservationHandler) Handle(ctx context.Context, cmd CreateReservationCommand) error {
	reservation, err := domain.NewReservation(cmd.ReservationID, cmd.CustomerName, cmd.TableID, cmd.DateTime)
	if err != nil {
		return err
	}
	return h.repo.Save(ctx, reservation)
}
