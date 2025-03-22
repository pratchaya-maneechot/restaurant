package reservation

import (
	defs "apps/reservation-service/internal/application/queries/reservation/defs"
	"apps/reservation-service/internal/domain"
	"apps/reservation-service/internal/infrastructure/querybus"
	"context"
	"fmt"
)

type GetReservationHandler struct {
	repo domain.ReservationRepository
}

func NewGetReservationHandler(repo domain.ReservationRepository) *GetReservationHandler {
	return &GetReservationHandler{repo: repo}
}

func (h *GetReservationHandler) Handle(ctx context.Context, query querybus.Query) (any, error) {
	params, ok := query.(defs.GetReservationQuery)
	if !ok {
		return nil, fmt.Errorf("invalid query type: expected GetReservationQuery, got %T", query)
	}
	return h.repo.FindByID(ctx, params.ReservationID)
}
