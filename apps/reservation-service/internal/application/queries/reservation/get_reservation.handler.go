package query

import (
	definition "apps/reservation-service/internal/application/queries/reservation/definitions"
	"apps/reservation-service/internal/domain"
	"apps/reservation-service/internal/infrastructure/query_bus"
	"context"
	"fmt"
)

type GetReservationHandler struct {
	repo domain.ReservationRepository
}

func NewGetReservationHandler(repo domain.ReservationRepository) *GetReservationHandler {
	return &GetReservationHandler{repo: repo}
}

func (h *GetReservationHandler) Handle(ctx context.Context, query query_bus.Query) (interface{}, error) {
	params, ok := query.(definition.GetReservationQuery)
	if !ok {
		return nil, fmt.Errorf("invalid query type: expected GetReservationQuery, got %T", query)
	}
	return h.repo.FindByID(ctx, params.ReservationID)
}
