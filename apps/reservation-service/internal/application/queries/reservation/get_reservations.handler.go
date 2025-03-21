package query

import (
	definition "apps/reservation-service/internal/application/queries/reservation/definitions"
	"apps/reservation-service/internal/domain"
	"context"
)

type GetReservationsHandler struct {
	repo domain.ReservationRepository
}

func NewGetReservationsHandler(repo domain.ReservationRepository) *GetReservationsHandler {
	return &GetReservationsHandler{repo: repo}
}

func (h *GetReservationsHandler) Handle(ctx context.Context, query definition.GetReservationsQuery) ([]*domain.Reservation, error) {
	return h.repo.FindAll(ctx)
}
