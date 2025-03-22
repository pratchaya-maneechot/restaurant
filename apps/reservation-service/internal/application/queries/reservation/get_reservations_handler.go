package reservation

import (
	"apps/reservation-service/internal/domain"
	"apps/reservation-service/internal/infrastructure/querybus"
	"context"
)

type GetReservationsHandler struct {
	repo domain.ReservationRepository
}

func NewGetReservationsHandler(repo domain.ReservationRepository) *GetReservationsHandler {
	return &GetReservationsHandler{repo: repo}
}

func (h *GetReservationsHandler) Handle(ctx context.Context, query querybus.Query) (any, error) {
	return h.repo.FindAll(ctx)
}
