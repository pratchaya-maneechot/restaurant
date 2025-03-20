package definitions

import (
	"apps/reservation-service/internal/domain"
	"context"
)

type GetReservationQuery struct {
	ReservationID string
}

func (q GetReservationQuery) Type() string {
	return "GetReservation"
}

type GetReservationHandler struct {
	repo domain.ReservationRepository
}

func NewGetReservationHandler(repo domain.ReservationRepository) *GetReservationHandler {
	return &GetReservationHandler{repo: repo}
}

func (h *GetReservationHandler) Handle(ctx context.Context, query GetReservationQuery) (interface{}, error) {
	return h.repo.FindByID(ctx, query.ReservationID)
}
