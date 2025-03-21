package query

import (
	definition "apps/reservation-service/internal/application/queries/reservation/definitions"
	"apps/reservation-service/internal/domain"
	"context"
)

type GetReservationHandler struct {
	repo domain.ReservationRepository
}

func NewGetReservationHandler(repo domain.ReservationRepository) *GetReservationHandler {
	return &GetReservationHandler{repo: repo}
}

func (h *GetReservationHandler) Handle(ctx context.Context, query definition.GetReservationQuery) (*domain.Reservation, error) {
	return h.repo.FindByID(ctx, query.ReservationID)
}
