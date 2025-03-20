package definitions

import (
	"apps/reservation-service/internal/domain"
	"context"
)

type GetReservationsQuery struct{}

func (q GetReservationsQuery) Type() string {
	return "GetReservations"
}

type GetReservationsHandler struct {
	repo domain.ReservationRepository
}

func NewGetReservationsHandler(repo domain.ReservationRepository) *GetReservationsHandler {
	return &GetReservationsHandler{repo: repo}
}

func (h *GetReservationsHandler) Handle(ctx context.Context, query GetReservationsQuery) (interface{}, error) {
	return h.repo.FindAll(ctx)
}
