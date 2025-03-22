package reservation

import (
	defs "apps/reservation-service/internal/application/queries/reservation/defs"
	"apps/reservation-service/internal/domain"
	"context"
)

type GetReservationsHandler struct {
	repo domain.ReservationRepository
}

func NewGetReservationsHandler(repo domain.ReservationRepository) *GetReservationsHandler {
	return &GetReservationsHandler{repo: repo}
}

func (h *GetReservationsHandler) Handle(ctx context.Context, query defs.GetReservationsQuery) (interface{}, error) {
	return h.repo.FindAll(ctx)
}
